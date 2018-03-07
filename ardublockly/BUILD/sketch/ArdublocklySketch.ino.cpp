#include <Arduino.h>
#line 1
#line 1 "/home/francois/GIT/ArduBloQliic/ardublockly/ArdublocklySketch/ArdublocklySketch.ino"
boolean magnetometer = false;
int magnetometerAxeX, magnetometerAxeY, magnetometerAxeZ, magnetometerDegre;
#include <QliicMagnetometer.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C LCD(39,16,2);

int degre;
int x;
int y;
int z;
String magnetometerValues;
String msg;

#line 14 "/home/francois/GIT/ArduBloQliic/ardublockly/ArdublocklySketch/ArdublocklySketch.ino"
void setup();
#line 21 "/home/francois/GIT/ArduBloQliic/ardublockly/ArdublocklySketch/ArdublocklySketch.ino"
void loop();
#line 14
void setup() {
  Serial.begin(9600);
  magnetometerSetup();
  LCD.init();
  LCD.backlight();
}

void loop() {
  degre = magnetometerDegre;
  x = magnetometerAxeX;
  y = magnetometerAxeY;
  z = magnetometerAxeZ;
  magnetometerValues = (String)(magnetometerRead());
  msg = String(degre) + String(",") + String(x) + String(",") + String(y) + String(",") + String(z);
  Serial.println(magnetometerValues);
  Serial.println(msg);
  LCD.clear();
  LCD.print(magnetometerValues);
  LCD.setCursor(0,1);
  LCD.print(msg);
  delay(100);

}
