⋅˚₊‧ ୨୧ ‧₊˚ ⋅
1. learn GUI. 
when a spread is done, it should be visible to the user.
2. do not panic!!!!

⋅˚₊‧ ୨୧ ‧₊˚ ⋅
1. Choose a topic. (love, general, career)

2. Do a random reading.

3. Determine the length.
* Length not more than the cards that are left.   

4. "I did not understand the meaning of the card. Pick one more for interpretation." so pick one more card until the person understands it. Which card? Ask for which and display the cards first. 
For interpretations of cards, get data from the internet somehow.

6. Pick the cards from the table. (needed some html and cs knowledge too.).


7. Randomly choose a topic.

As long as the user keeps getting cards from the pile, add them to her own piles actually.
⋅˚₊‧ ୨୧ ‧₊˚ ⋅


Player.java
============
* getCards(); 
* pickCards();
* displayPlayerCards();
* getPreviousReadings(); 
to keep track of them, maybe you need to have a database and it requires log-in.

TarotReading.java
============
ArrayList<Reader> readers = new ArrayList<>();
ArrayList<Player> players = new ArrayList<>();

ArrayList<Card> generalCards = newArrayList<>();
ArrayList<Card> loveCards = newArrayList<>();
ArrayList<Card> careerCards = newArrayList<>();

* displayLeftCards();
* pickCards();
* getHelpForCard(); 

* threeCardSpread();
to understand a card better. if the user does this, add the card in the tile again;
* twoCardSpread();
* oneCardSpread();
* doASpread(int number); 

* Do a random reading or not.
* Choose a topic or not.


??? Some cards have different meaning when they get together.

⋅˚₊‧ ୨୧ ‧₊˚ ⋅ 
Choose Card object. 
It has an attributes of 
String name; (if it is from major arcana, do not give it a value?)
int number;
String group; (swords, pentacles, cups, wands)

TarotDeck.java
============

* initializeDeck();
* shuffleDeck();


⋅˚₊‧ ୨୧ ‧₊˚ ⋅  
Can you understand their intentions by their questions???
Abstract class: TarotSpread

      GeneralSpread.java (extends TarotSpread)
      ============

      CareerSpread.java (extends TarotSpread)
      ============

      LoveSpread.java (extends TarotSpread)
      ============

⋅˚₊‧ ୨୧ ‧₊˚ ⋅  
Reader.java
============
String name;
* spreadCount++;
i don't need it but some companies give their readers money depending on their hard work.
