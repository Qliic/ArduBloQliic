#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C LCD(39,16,2);

int i;

void setup() {
  LCD.init();
  LCD.backlight();
}

void loop() {
  for (i = 1; i <= 10; i++) {
    LCD.print(i);
    LCD.clear();
    delay(1000);
  }

}