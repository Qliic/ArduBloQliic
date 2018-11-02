#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C LCD(39,16,2);

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT_PULLUP);
  LCD.init();
  LCD.backlight();

  LCD.clear();

}

void loop() {
  if (! digitalRead(A0)) {
    LCD.setCursor(0,0);
    LCD.print("on ");
    Serial.println("on");
  }
  if (!! digitalRead(A0)) {
    LCD.setCursor(0,0);
    LCD.print("off");
  }

}