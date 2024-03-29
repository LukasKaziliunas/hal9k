#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
String inputString = "";         // a String to hold incoming data
bool stringComplete = false;  // whether the string is complete
int led = 8;
void setup() {
  lcd.begin();
  lcd.backlight();
  // put your setup code here, to run once:

  pinMode(led, OUTPUT);
  Serial.begin(9600);
  //Serial.setTimeout(10);
inputString.reserve(200);

}

void loop() {
  
  if (stringComplete) {
    lcd.clear();
    lcd.print(inputString);
    //Serial.println("recieved");
    inputString = "";
    stringComplete = false;
  }

}

void serialEvent() {

  while (Serial.available()) {
    
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }

}

int parseData(String Data)
{
  return Data.toInt();
}
