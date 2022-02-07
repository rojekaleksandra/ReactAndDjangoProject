from django.db import models
import datetime

class Client(models.Model):
    name = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    tel = models.CharField(max_length=15)
    email = models.EmailField(max_length=30)

    @property
    def full_name(self):
        return self.name + " " + self.lastname

    def __str__(self):
        return (self.name + " " + self.lastname)

class Object(models.Model):
    name = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    zip_code = models.CharField(max_length=6)
    street_house_numb = models.CharField(max_length=30)
    tel = models.CharField(max_length=15)
    email = models.EmailField(max_length=30)
    web_www = models.CharField(max_length=50)
    check_in = models.TimeField()
    check_out = models.TimeField()
    percent_advance_payment = models.IntegerField()
    numb_of_days_advance_payment = models.IntegerField()

    def __str__(self):
        return self.name


class Accommodation(models.Model):
    object = models.ForeignKey(Object, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    price_for_day = models.FloatField()
    numb_rooms = models.IntegerField()
    numb_people = models.IntegerField()
    double_bed = models.IntegerField()
    single_bed = models.IntegerField()

    def __str__(self):
        return str(self.object) + ": " + self.name 


class Reservation(models.Model):
    PaymentStatus = models.TextChoices('PaymentStatus', 'Paid PaidAP Unpaid')
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    object = models.ForeignKey(Object, on_delete=models.CASCADE, default="")
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    arrival_date = models.DateField('arrival date')
    departure_date = models.DateField('departure date')
    # total_price = models.FloatField()
    # advance_payment = models.FloatField()
    # advance_payment_date = models.DateField('advance payment date')
    payment_status = models.CharField(choices = PaymentStatus.choices, max_length=10, default='Paid')
    add_info = models.CharField(max_length=250, blank=True)

 # total_price = models.FloatField( default = date_diff(), editable=False)
        # def date_diff(self):
    #     return (self.departure_date - self.arrival_date ).days

    def __str__(self):
        return str(self.accommodation)
