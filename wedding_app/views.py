from django.shortcuts import render, redirect
from django.views import View
from .models import Guest
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponseNotFound
import qrcode
from PIL import Image
from django.conf import settings
from django.contrib.auth.decorators import login_required
import requests
import os


def home_view(requests):
    """ render the home page """
    return render(requests, 'wedding_app/home.html', context={'title': 'Home'})


class InvitationView(View):
    template_name = 'wedding_app/invitation.html'

    def get(self, *args, **kwargs):
        context = dict()
        try:
            guest = Guest.objects.get(code=kwargs['guest'])
            guest.read = True
            guest.save()
            context['guest'] = guest
            context['passport_number'] = "3222020" + str(guest.pk)
        except ObjectDoesNotExist:
            # Should only happened when a url is manually typed
            return HttpResponseNotFound('<h1>Page not found</h1>')

        return render(self.request, self.template_name, context=context)


class ConfirmationView(View):
    template_name = 'wedding_app/confirmation.html'

    def get(self, *args, **kwargs):
        context = dict()
        return render(self.request, self.template_name, context=context)

    def post(self, *args, **kwargs):
        if self.request.method == "POST":
            context = dict()
            try:
                guest = Guest.objects.get(code=kwargs['guest'])
                context['guest'] = guest
            except ObjectDoesNotExist:
                # Should only happened when a url is manually typed
                return HttpResponseNotFound('<h1>Page not found</h1>')

            try:
                _ = self.request.POST['yes_no']
                guest.choice = 1
                qr = qrcode.QRCode(
                    version=1,
                    error_correction=qrcode.constants.ERROR_CORRECT_H,
                    box_size=10,
                    border=4,
                )

                qr.add_data(guest.code)
                qr.make(fit=True)
                img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

                img.save(os.path.join(settings.MEDIA_ROOT, str(guest.code) + "_qr_code.png"))
                guest.save()
                return redirect('/invitation/' + str(guest.code) + '/details/')
            except MultiValueDictKeyError:
                guest.choice = 2
                guest.save()
                return redirect('/invitation/' + str(guest.code) + '/refused/')
            return render(self.request, self.template_name, context=context)


class DetailsView(View):
    template_name = 'wedding_app/details.html'

    def get(self, *args, **kwargs):
        context = dict()
        try:
            guest = Guest.objects.get(code=kwargs['guest'])
            context['guest'] = guest
        except ObjectDoesNotExist:
            # Should only happened when a url is manually typed
            return HttpResponseNotFound('<h1>Page not found</h1>')

        return render(self.request, self.template_name, context=context)


class RefusedView(View):
    template_name = 'wedding_app/refused.html'

    def get(self, *args, **kwargs):
        context = dict()
        try:
            guest = Guest.objects.get(code=kwargs['guest'])
            context['guest'] = guest
        except ObjectDoesNotExist:
            # Should only happened when a url is manually typed
            return HttpResponseNotFound('<h1>Page not found</h1>')

        return render(self.request, self.template_name, context=context)
