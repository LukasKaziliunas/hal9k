#include <cppQueue.h>

#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
String inputString = "";         // a String to hold incoming data
String command = "";
String parameter = "";
bool stringComplete = false;  // whether the string is complete
int lamp = 8;

String parseDirection();
int parseDistance();

int right = 2;
 int left = 3;
 int forward = 4;
 int back = 5;



void serialEvent() {

  while (Serial.available()) {
    
    // get the new byte:
    char inChar = (char)Serial.read();
    // add it to the inputString:
    if (inChar != '\n') {
      inputString += inChar;
    }
    
    // if the incoming character is a newline, set a flag so the main loop can
    // do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
  }

}

//---------------------- parse

String parseCommand(String input)
{
  input.remove(input.indexOf(":"));
  return input;  
  
}

String parseParameter(String input)
{
  input.remove(0, input.indexOf(":") + 1);
  return input;  
  
}

String parseDirection(String input)
{
  input.remove(input.indexOf("-"));
  return input;  
  
}

int parseDistance(String input)
{
  input.remove(0, input.indexOf("-") + 1);
  return input.toInt();  
  
}

int parseData(String Data)
{
  return Data.toInt();
}
//----------------------rc car

void controlCart(String param)
{
    String dir = parseDirection(param);
    int dur = parseDistance(param);

    if(dir == "FL")
    {
      driveForwardLeft(dur);
    }
    
    if(dir == "F")
    {
      driveForward(dur);
    }
    
    if(dir == "FR")
    {
      driveForwardRight(dur);
    }
    
    if(dir == "BL")
    {
      driveBackwardLeft(dur);
    }
    
    if(dir == "B")
    {
      driveBackward(dur);
    }
    
    if(dir == "BR")
    {
      driveBackwardRight(dur);
    }
      
}

void controlLamp(String param)
{

    if(param == "ON")
    {
      digitalWrite(lamp, LOW);
    }
    
    if(param == "OFF")
    {
      digitalWrite(lamp, HIGH);
    }
      
}

void driveForward(int distance)
{
  int time = distance * 1000;
  moveForward(true);
  delay(time);
  moveForward(false);
}

void driveBackward(int distance)
{
  int time = distance * 1000;
  moveBackward(true);
  delay(time);
  moveBackward(false);
}

void driveForwardRight(int distance)
{
    int time = distance * 1000;
    turnRight(true);
    moveForward(true);
    delay(time);
    moveForward(false);
    turnRight(false);
}

void driveBackwardRight(int distance)
{
    int time = distance * 1000;
    turnRight(true);
    moveBackward(true);
    delay(time);
    moveBackward(false);
    turnRight(false);
}

void driveForwardLeft(int distance)
{
    int time = distance * 1000;
    turnLeft(true);
    moveForward(true);
    delay(time);
    moveForward(false);
    turnLeft(false);
}

void driveBackwardLeft(int distance)
{
    int time = distance * 1000;
    turnLeft(true);
    moveBackward(true);
    delay(time);
    moveBackward(false);
    turnLeft(false);
}
//***************************************************
void turnRight(bool state)
{
  digitalWrite(right, state);  
}

void turnLeft(bool state)
{
  digitalWrite(left, state);  
}

void moveForward(bool state)
{
  digitalWrite(forward, state);  
}

void moveBackward(bool state)
{
  digitalWrite(back, state);  
}



//***********************************************************

void setup() {
  lcd.begin();
  lcd.backlight();
  // put your setup code here, to run once:
  lcd.print("hello");
  pinMode(lamp, OUTPUT);
  digitalWrite(lamp, HIGH); //normaly open is opened
  Serial.begin(9600);
  //Serial.setTimeout(10);
inputString.reserve(200);

 pinMode(right, OUTPUT);
 pinMode(left, OUTPUT);
 pinMode(forward, OUTPUT);
 pinMode(back, OUTPUT);


digitalWrite(right, LOW);  
digitalWrite(left, LOW); 
digitalWrite(forward, LOW); 
digitalWrite(back, LOW); 

}

void loop() {
  
  if (stringComplete) {
    lcd.clear();
    command = parseCommand(inputString);
    parameter = parseParameter(inputString);
    lcd.print(inputString);
    if(command == "CART")
    {
        controlCart(parameter);
    }

    if(command == "LAMP")
    {
        controlLamp(parameter);
    }
    
    //Serial.println("recieved");
    inputString = "";
    stringComplete = false;
  }

}
