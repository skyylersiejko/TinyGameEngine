from random import randint
from random import choice 


class Pokemon:
  def __init__(self, name, attack, speed, types):
    self.name = name
    self.attack = attack
    self.health = 100
    self.speed = speed
    self.isFaster = False
    self.types = types 
    
  def damage(self,amount):
    self.health -= amount
    return self.health
    
  def stats(self):
    print "*************************"
    print "Name: " + self.name
    print "Health: " + str(self.health)
    print "Attack: "+ str(self.attack)
    print "Speed:" + str(self.speed)
    print "*************************"
  
  def checkWeakness(self, b_type):
    if self.types == "grass" and b_type == "fire":
      self.attack -= self.attack*.40
   
    if self.types == "electric" and b_type == "water":
      self.attack -= self.attack*.30
      
    if self.types == "normal" and b_type == "ground":
      self.attack -= self.attack*.15
      
    if self.types == "normal" and b_type == "psychic":
      self.attack -= self.attack*.50
    return self.attack
      
    
    
      
deadPokemon = []  
  



ralts = Pokemon("Ralts", randint(1,25), randint(5,10), "psychic")
pidgey = Pokemon("Pidgey", randint(1,25), randint(5,10), "normal")
bulbasaur =Pokemon("Bulbasaur", randint(1,25), randint(5,10), "grass")
abra = Pokemon("Abra", randint(1,25), randint(5,10), "Psychic")
oddish = Pokemon("Oddish", randint(1,25), randint(5,10), "grass")
jigglyPuff= Pokemon("Jiggley Puff", randint(1,25), randint(5,10), "normal")
voltorb = Pokemon("Voltorb", randint(1,25), randint(5,10), "electric")
rattata = Pokemon("Rattata", randint(1,25), randint(5,10), "normal")
pikachu =  Pokemon("Pikachu", randint(1,25), randint(5,10), "electric")

team = [ralts, pidgey, bulbasaur, abra,oddish, jigglyPuff]
enemyTeam = [voltorb, rattata, pikachu]


def combat(a,b):
  
  if a.health >0 and b.health >0:  
    if a.speed > b.speed:
      a.isFaster = True
    else:
      b.isFaster = True
    
    if a.isFaster:
      b.damage(a.checkWeakness(b.types))
      a.damage(b.checkWeakness(a.types))
    else:
      a.damage(b.checkWeakness(a.types))
      b.damage(a.checkWeakness(b.types))
    print "##########"+a.name +" VS "+ b.name+"###############\n"
    a.stats()
    b.stats()
    print "##########################################################"
    return True
  else:
    print "a pokemon has died!"
    if a.health <=0:
      deadPokemon.append(a)
    elif b.health <=0:
      deadPokemon.append(b)
    return False
    

  
  
totalPokemon = len(team)+ len(enemyTeam)
myPokemon = choice(team)
enemyPokemon = choice(enemyTeam)
rounds = 0
while len(deadPokemon) <= totalPokemon-1:
  myPokemon = choice(team)
  enemyPokemon = choice(enemyTeam)
  if myPokemon not in deadPokemon:
    combat(myPokemon, enemyPokemon)
  else:
     print "pokemon dead"
     
  rounds +=1
  print "Round: " + str(rounds)
  if len(deadPokemon) >totalPokemon-1:
     for i in range(len(deadPokemon)):
       print "Dead Pokemon" + str(deadPokemon[i].name)
     break
    
  
