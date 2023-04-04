# Generated by Django 3.2 on 2021-04-15 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BLAP',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('dataset', models.CharField(max_length=50, verbose_name='dataset')),
                ('datasize', models.IntegerField(verbose_name='datasize')),
                ('network', models.CharField(max_length=50, verbose_name='network')),
                ('aggregation', models.IntegerField(verbose_name='aggregation')),
                ('iteration', models.IntegerField(verbose_name='iteration')),
            ],
        ),
        migrations.CreateModel(
            name='MinCost',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('dataset', models.CharField(max_length=50, verbose_name='dataset')),
                ('datasize', models.IntegerField(verbose_name='datasize')),
                ('network', models.CharField(max_length=50, verbose_name='network')),
                ('aggregation', models.IntegerField(verbose_name='aggregation')),
                ('iteration', models.IntegerField(verbose_name='iteration')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=100, verbose_name='email')),
                ('password', models.CharField(max_length=50, verbose_name='password')),
            ],
        ),
        migrations.CreateModel(
            name='Usertoken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=64)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='Userprofile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='Qinian', max_length=100, verbose_name='name')),
                ('phone', models.CharField(max_length=50, verbose_name='phone')),
                ('career', models.CharField(max_length=50, verbose_name='career')),
                ('city', models.CharField(max_length=50, verbose_name='city')),
                ('country', models.CharField(max_length=50, verbose_name='country')),
                ('remark', models.CharField(max_length=50, verbose_name='remark')),
                ('Intro', models.TextField(max_length=1000, verbose_name='Intro')),
                ('userid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='result_MinCost',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('MinCostid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.mincost')),
                ('userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='result_BLAP',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('BLAPid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.blap')),
                ('userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.AddField(
            model_name='mincost',
            name='userid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AddField(
            model_name='blap',
            name='userid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
    ]