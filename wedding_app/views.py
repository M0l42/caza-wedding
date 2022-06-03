from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import RedirectView
from .models import Guest, GROUP
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponseNotFound
import qrcode
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
from django.conf import settings
from django.contrib.auth.decorators import login_required
import requests
import os
from wedding.settings import MEDIA_ROOT



def qr_generator(guest):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    group_seat = GROUP[guest.group_seat][1]
    data = "Name : " + guest.name + "\nStatus : ACCEPTED \nInvitation Ref No : " + str(
        guest.code) + "\nBoarding Group or Table No : " + str(
        group_seat) + "\nLink : http://caza-nuptials.com/invitation/" + str(guest.code)

    logo_display = Image.open('wedding_app/static/img/profile.jpg')
    logo_display.thumbnail((60, 60))

    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert('RGB')
    img.thumbnail((320, 320))

    logo_pos = ((img.size[0] - logo_display.size[0]) // 2, (img.size[1] - logo_display.size[1]) // 2)
    img.paste(logo_display, logo_pos)

    guest.qr_code = img
    path = os.path.join(MEDIA_ROOT, 'qr_code/')
    img.save(path + str(guest.code) + "_qr_code.jpg")


def boarding_pass_generator(guest):
    img = Image.open('wedding_app/static/img/boarding_pass.jpg')

    # Call draw Method to add 2D graphics in an image
    I1 = ImageDraw.Draw(img)

    # Custom font style and font size
    my_font = ImageFont.truetype('wedding_app/static/fonts/GIL/GIL_____.ttf', 50)
    my_font_code = ImageFont.truetype('wedding_app/static/fonts/GIL/GILB____.ttf', 80)
    qr_path = os.path.join(MEDIA_ROOT, 'qr_code/')
    bp_path = os.path.join(MEDIA_ROOT, 'boarding_pass/')

    # Add Text to an image
    I1.text((60, 200), guest.name, font=my_font, fill=(0, 0, 0))
    I1.text((60, 800), str(guest.code), font=my_font, fill=(0, 0, 0))
    I1.text((155, 1129), "3222020{:02d}".format(guest.pk), font=my_font, fill=(0, 0, 0))
    I1.text((610, 1600), "{:02d}".format(guest.pk), font=my_font_code, fill=(0, 0, 0))
    group_seat = GROUP[guest.group_seat][1]
    if guest.group_seat in (1, 2):
        I1.text((280, 1920), group_seat, font=my_font, fill=(0, 0, 0))
    elif guest.group_seat is 0:
        I1.text((220, 1920), group_seat, font=my_font, fill=(0, 0, 0))
    else:
        I1.text((300, 1920), group_seat, font=my_font, fill=(0, 0, 0))
    print("#################")
    print(group_seat)
    print("#################")
    if not os.path.exists(qr_path + str(guest.code) + "_qr_code.jpg"):
        qr_generator(guest)
    qr_code = Image.open(qr_path + str(guest.code) + "_qr_code.jpg")
    qr_code_pos = (225, 1280)
    img.paste(qr_code, qr_code_pos)

    img.save(bp_path + str(guest.code) + "_boarding_pass.jpg")


def home_view(requests):
    """ render the home page """
    return render(requests, 'wedding_app/home.html', context={'title': 'Home'})


def program_view(requests):
    """ render the program page """
    return render(requests, 'wedding_app/program.html', context={'title': 'Program'})


class InvitationView(View):
    template_name = 'wedding_app/invitation.html'

    def get(self, *args, **kwargs):
        context = dict()
        context['title'] = "Invitation"
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
        context['title'] = "Confirmation"
        return render(self.request, self.template_name, context=context)

    def post(self, *args, **kwargs):
        if self.request.method == "POST":
            context = dict()
            context['title'] = "Confirmation"
            try:
                guest = Guest.objects.get(code=kwargs['guest'])
                context['guest'] = guest
            except ObjectDoesNotExist:
                # Should only happened when a url is manually typed
                return HttpResponseNotFound('<h1>Page not found</h1>')

            try:
                _ = self.request.POST['yes_no']
                guest.choice = 1
                qr_generator(guest)
                # guest.save()
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
        context['title'] = "Details"
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
        context['title'] = "Refused"
        try:
            guest = Guest.objects.get(code=kwargs['guest'])
            context['guest'] = guest
        except ObjectDoesNotExist:
            # Should only happened when a url is manually typed
            return HttpResponseNotFound('<h1>Page not found</h1>')

        return render(self.request, self.template_name, context=context)


class BoardingPassGeneratorView(LoginRequiredMixin, View):
    template_name = 'wedding_app/boarding_pass_generator.html'
    login_url = '/'

    def get(self, *args, **kwargs):
        context = dict()
        context['title'] = "Generator"
        return render(self.request, self.template_name, context=context)

    def post(self, *args, **kwargs):
        context = dict()
        context['title'] = "Generator"
        if self.request.method == "POST":
            context = dict()
            guests = Guest.objects.filter(choice=1)
            for guest in guests:
                boarding_pass_generator(guest)
            # except MultiValueDictKeyError:
            #     pass

            return render(self.request, self.template_name, context=context)

    # def get_redirect_url(self, *args, **kwargs):
    #     return super().get_redirect_url(*args, **kwargs)


class BoardingPassView(View):
    template_name = 'wedding_app/boarding_pass.html'

    def get(self, *args, **kwargs):
        context = dict()
        context['title'] = "Boarding Pass"
        try:
            guest = Guest.objects.get(code=kwargs['guest'])
            context['guest'] = guest
        except ObjectDoesNotExist:
            # Should only happened when a url is manually typed
            return HttpResponseNotFound('<h1>Page not found</h1>')

        return render(self.request, self.template_name, context=context)
