import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'qc_back.settings')
django.setup()
from back.qc_api.models import Kospi


if __name__=='main':
    print(Kospi)