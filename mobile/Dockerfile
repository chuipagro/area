FROM ghcr.io/cirruslabs/flutter:3.13.9

COPY . /app
WORKDIR /app

RUN rm -f .packages

RUN flutter pub get
RUN flutter clean
RUN flutter build apk

RUN mkdir /mobile_app/
RUN cp build/app/outputs/apk/release/app-release.apk /mobile_app/client.apk
