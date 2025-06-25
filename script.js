// Tarot deck data
const tarotDeck = [
      // Major Arcana
      { name: "The Fool", group: "major", number: 0 },
      { name: "The Magician", group: "major", number: 1 },
      { name: "The High Priestess", group: "major", number: 2 },
      { name: "The Empress", group: "major", number: 3 },
      { name: "The Emperor", group: "major", number: 4 },
      { name: "The Hierophant", group: "major", number: 5 },
      { name: "The Lovers", group: "major", number: 6 },
      { name: "The Chariot", group: "major", number: 7 },
      { name: "Strength", group: "major", number: 8 },
      { name: "The Hermit", group: "major", number: 9 },
      { name: "Wheel of Fortune", group: "major", number: 10 },
      { name: "Justice", group: "major", number: 11 },
      { name: "The Hanged Man", group: "major", number: 12 },
      { name: "Death", group: "major", number: 13 },
      { name: "Temperance", group: "major", number: 14 },
      { name: "The Devil", group: "major", number: 15 },
      { name: "The Tower", group: "major", number: 16 },
      { name: "The Star", group: "major", number: 17 },
      { name: "The Moon", group: "major", number: 18 },
      { name: "The Sun", group: "major", number: 19 },
      { name: "Judgement", group: "major", number: 20 },
      { name: "The World", group: "major", number: 21 }
  ];
  
  // Add Minor Arcana
  const suits = ['cups', 'wands', 'swords', 'pentacles'];
  const numbers = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'];
  
  suits.forEach(suit => {
      numbers.forEach((num, index) => {
          tarotDeck.push({
              name: `${num} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
              group: suit,
              number: index + 1
          });
      });
  });
  
  // Game state
  let currentDeck = [...tarotDeck];
  let selectedCards = [];
  let currentReading = [];
  let selectedTopic = 'general';
  
  // Initialize the game
  function initGame() {
      shuffleDeck();
      updateDisplay();
      createStars();
  }
  
  function createStars() {
      const starsContainer = document.getElementById('stars');
      starsContainer.innerHTML = '';
      for (let i = 0; i < 50; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.width = Math.random() * 3 + 1 + 'px';
          star.style.height = star.style.width;
          star.style.animationDelay = Math.random() * 3 + 's';
          starsContainer.appendChild(star);
      }
  }
  
  function shuffleDeck() {
      // Desteki sıfırla ve karıştır
      currentDeck = [...tarotDeck];
      for (let i = currentDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
      }
      
      // Seçimleri temizle
      selectedCards = [];
      currentReading = [];
      
      // Yorum alanını gizle
      document.getElementById('interpretationArea').classList.remove('show');
      
      updateDisplay();
      updateStatus("Deck shuffled! ✨ Ready for your mystical reading.");
  }
  
  function switchTheme(theme) {
      const body = document.body;
      const buttons = document.querySelectorAll('.theme-btn');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
      
      body.classList.remove('love-theme', 'career-theme');
      
      if (theme === 'love') {
          body.classList.add('love-theme');
          selectedTopic = 'love';
          createLoveParticles();
          updateStatus("Love theme activated! 💖 Click cards to explore matters of the heart ✨");
      } else if (theme === 'career') {
          body.classList.add('career-theme');
          selectedTopic = 'career';
          createStarParticles();
          updateStatus("Career theme activated! ⭐ Click cards to discover your professional path ✨");
      } else {
          selectedTopic = 'general';
          createStars();
          updateStatus("Default mystical theme activated! 🌙 Click cards for general life guidance ✨");
      }
  }
  
  function createLoveParticles() {
      const starsContainer = document.getElementById('stars');
      starsContainer.innerHTML = '';
      
      for (let i = 0; i < 30; i++) {
          const heart = document.createElement('div');
          heart.innerHTML = '💖';
          heart.style.position = 'absolute';
          heart.style.left = Math.random() * 100 + '%';
          heart.style.top = Math.random() * 100 + '%';
          heart.style.fontSize = Math.random() * 20 + 10 + 'px';
          heart.style.animationDelay = Math.random() * 3 + 's';
          heart.style.animation = 'twinkle 3s infinite, float 6s infinite ease-in-out';
          heart.style.pointerEvents = 'none';
          starsContainer.appendChild(heart);
      }
  }
  
  function createStarParticles() {
      const starsContainer = document.getElementById('stars');
      starsContainer.innerHTML = '';
      
      for (let i = 0; i < 40; i++) {
          const star = document.createElement('div');
          star.innerHTML = '⭐';
          star.style.position = 'absolute';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.fontSize = Math.random() * 15 + 8 + 'px';
          star.style.animationDelay = Math.random() * 3 + 's';
          star.style.animation = 'twinkle 3s infinite, rotate 8s infinite linear';
          star.style.pointerEvents = 'none';
          starsContainer.appendChild(star);
      }
  }
  
  function selectCardFromDeck(cardIndex) {
      if (cardIndex >= currentDeck.length) return;
      
      if (selectedCards.length >= 5) {
          updateStatus("Maximum 5 cards can be selected! ⚠️");
          return;
      }
      
      // Kartı desteden çıkar ve seçilenlere ekle
      const selectedCard = currentDeck.splice(cardIndex, 1)[0];
      selectedCards.push(selectedCard);
      
      updateDisplay();
      updateStatus(`Card selected: ${selectedCard.name}! (${selectedCards.length}/5 cards selected)`);
  }
  
  function interpretSelected() {
      if (selectedCards.length === 0) {
          updateStatus("Please select at least one card first! 🎯");
          return;
      }
      
      // Seçilen kartları reading'e aktar
      currentReading = [...selectedCards];
      
      // Loading mesajı göster
      showInterpretationLoading();
      
      // 2 saniye sonra yorumları göster
      setTimeout(() => {
          showInterpretationArea();
      }, 2000);
  }
  
  function showInterpretationLoading() {
      const interpretationArea = document.getElementById('interpretationArea');
      const contentDiv = document.getElementById('interpretationContent');
      
      // Loading mesajı
      contentDiv.innerHTML = '<div class="loading-message">🔮 Mystical energies are being consulted...</div>';
      
      // Yorum alanını göster
      interpretationArea.classList.add('show');
      
      // Scroll to interpretation area
      setTimeout(() => {
          interpretationArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
  }
  
  function randomReading() {
      // Random tema seç
      const themes = ['default', 'love', 'career'];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      switchTheme(randomTheme);
  
      const maxCards = Math.min(3, currentDeck.length);
      if (maxCards === 0) {
          updateStatus("No cards left in deck! Please shuffle or return cards.");
          return;
      }
  
      // Random sayıda kart seç
      const spreadSize = Math.floor(Math.random() * maxCards) + 1;
      selectedCards = [];
      
      for (let i = 0; i < spreadSize; i++) {
          const randomIndex = Math.floor(Math.random() * currentDeck.length);
          const card = currentDeck.splice(randomIndex, 1)[0];
          selectedCards.push(card);
      }
      
      currentReading = [...selectedCards];
      updateDisplay();
      
      // Loading ve sonra yorum göster
      showInterpretationLoading();
      setTimeout(() => {
          showInterpretationArea();
      }, 2000);
      
      const topicDisplay = selectedTopic === 'general' ? 'general life guidance' : selectedTopic;
      updateStatus(`Random reading: ${spreadSize} cards for ${topicDisplay}! 🎲✨`);
  }
  
  function showInterpretationArea() {
      const interpretationArea = document.getElementById('interpretationArea');
      const contentDiv = document.getElementById('interpretationContent');
      
      // Yorumları yeniden oluştur
      const topicDisplay = selectedTopic === 'general' ? 'General Life Guidance' : 
                         selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1);
      
      // Her kart için yeniden meaning al ve ekle
      setTimeout(async () => {
          let fullInterpretation = `<h4>Your ${topicDisplay} Reading</h4>`;
          
          for (let i = 0; i < currentReading.length; i++) {
              const card = currentReading[i];
              const meaning = await getCardMeaning(card, selectedTopic);
              
              fullInterpretation += `<div class="interpretation-card">
                  <h5>Card ${i + 1}: ${card.name}</h5>
                  <p>${meaning}</p>
              </div>`;
          }
          
          contentDiv.innerHTML = fullInterpretation;
      }, 100);
      
      // Yorum alanını göster
      interpretationArea.classList.add('show');
  }
  
  async function getCardMeaning(card, topic) {
      const generalMeanings = {
          "The Fool": "New beginnings, spontaneity, and taking a leap of faith. Trust your instincts and embrace the unknown.",
          "The Magician": "Manifestation, resourcefulness, and personal power. You have all the tools needed to succeed.",
          "The High Priestess": "Intuition, sacred knowledge, and inner wisdom. Listen to your subconscious mind.",
          "The Empress": "Fertility, femininity, and abundance. Creativity and nurturing energy surround you.",
          "The Emperor": "Authority, structure, and control. Take charge of your situation with confidence.",
          "The Hierophant": "Tradition, spiritual guidance, and conformity. Seek wisdom from established sources.",
          "The Lovers": "Love, harmony, and choices. An important decision regarding relationships awaits.",
          "The Chariot": "Victory, determination, and control. Move forward with confidence and willpower.",
          "Strength": "Inner strength, courage, and patience. You have the power to overcome any challenge.",
          "The Hermit": "Soul searching, introspection, and guidance. Look within for the answers you seek.",
          "Wheel of Fortune": "Good fortune, karma, and life cycles. Change and opportunity are coming.",
          "Justice": "Justice, fairness, and truth. Balance and accountability are needed in this situation.",
          "The Hanged Man": "Suspension, restriction, and letting go. Sometimes patience and surrender are required.",
          "Death": "Transformation, endings, and new beginnings. A major life change is occurring.",
          "Temperance": "Balance, moderation, and patience. Find harmony and the middle path.",
          "The Devil": "Bondage, materialism, and temptation. Examine what may be holding you back.",
          "The Tower": "Sudden upheaval, broken pride, and disaster. Expect unexpected changes.",
          "The Star": "Hope, spirituality, and renewal. Your wishes and dreams may come true.",
          "The Moon": "Illusion, fear, and anxiety. Not everything is as it seems - trust your intuition.",
          "The Sun": "Joy, success, and vitality. Happiness, achievement, and positive energy await.",
          "Judgement": "Judgement, rebirth, and inner calling. A second chance and spiritual awakening.",
          "The World": "Completion, accomplishment, and travel. Success, fulfillment, and achievement of goals."
      };
  
      let baseMeaning = generalMeanings[card.name];
      
      if (!baseMeaning) {
          // Minor arcana meanings
          if (card.name.includes('Ace')) {
              baseMeaning = "New beginnings and pure potential in this area of life.";
          } else if (card.name.includes('2')) {
              baseMeaning = "Balance, partnerships, and choices that need to be made.";
          } else if (card.name.includes('3')) {
              baseMeaning = "Growth, creativity, and initial success in your endeavors.";
          } else if (card.name.includes('4')) {
              baseMeaning = "Stability, foundation, and the need for solid structure.";
          } else if (card.name.includes('5')) {
              baseMeaning = "Conflict, change, and challenges that lead to growth.";
          } else if (card.name.includes('6')) {
              baseMeaning = "Harmony, healing, and moving toward better times.";
          } else if (card.name.includes('7')) {
              baseMeaning = "Reflection, assessment, and spiritual development.";
          } else if (card.name.includes('8')) {
              baseMeaning = "Movement, progress, and mastery of skills.";
          } else if (card.name.includes('9')) {
              baseMeaning = "Near completion, wisdom gained, and approaching fulfillment.";
          } else if (card.name.includes('10')) {
              baseMeaning = "Completion of a cycle, culmination, and new beginnings ahead.";
          } else if (card.name.includes('Page')) {
              baseMeaning = "New learning, messages, and youthful energy in this area.";
          } else if (card.name.includes('Knight')) {
              baseMeaning = "Action, adventure, and dynamic movement toward goals.";
          } else if (card.name.includes('Queen')) {
              baseMeaning = "Mastery, intuition, and nurturing wisdom in this realm.";
          } else if (card.name.includes('King')) {
              baseMeaning = "Authority, mastery, and leadership in this domain.";
          }
          
          // Suit meanings
          if (card.group === 'cups') {
              baseMeaning += " This relates to emotions, relationships, love, and spiritual connections.";
          } else if (card.group === 'wands') {
              baseMeaning += " This concerns career, creativity, passion, and personal growth.";
          } else if (card.group === 'swords') {
              baseMeaning += " This involves thoughts, communication, conflict, and mental challenges.";
          } else if (card.group === 'pentacles') {
              baseMeaning += " This focuses on material matters, money, health, and practical concerns.";
          }
      }
  
      // Topic-specific modifications
      let contextualMeaning = baseMeaning;
      if (topic === 'love') {
          contextualMeaning += " In matters of the heart, this suggests deep emotional growth and meaningful connections in your romantic life.";
      } else if (topic === 'career') {
          contextualMeaning += " In your professional life, this indicates opportunities for advancement, success, and career development.";
      } else {
          contextualMeaning += " This card brings general guidance for your life path and personal development journey.";
      }
  
      return contextualMeaning;
  }
  
  function returnCards() {
      // Tüm seçilen kartları destede geri koy
      currentDeck.push(...selectedCards);
      selectedCards = [];
      currentReading = [];
      
      // Yorum alanını gizle
      document.getElementById('interpretationArea').classList.remove('show');
      
      shuffleDeck();
      updateStatus("All cards returned to deck and shuffled! ✨");
  }
  
  function updateDisplay() {
      updateDeckDisplay();
      updateDrawnDisplay();
      updateCounters();
      updateReadButton();
  }
  
  function updateDeckDisplay() {
      const deckDiv = document.getElementById('deckCards');
      deckDiv.innerHTML = '';
      
      const totalCards = currentDeck.length;
      const containerWidth = deckDiv.parentElement.clientWidth - 30;
      const containerHeight = 500;
      
      // FIXED POSITIONS - Kartlar seçilince karışmaz, sadece o kart kaybolur
      const fixedPositions = [];
      for (let i = 0; i < 78; i++) {
          const cols = Math.ceil(Math.sqrt(78 * 1.2));
          const col = i % cols;
          const row = Math.floor(i / cols);
          
          const cardSpacing = Math.min(50, (containerWidth - 100) / cols);
          const rowSpacing = Math.min(65, (containerHeight - 100) / Math.ceil(78 / cols));
          
          const x = col * cardSpacing + 50 + (Math.sin(i) * 15);
          const y = row * rowSpacing + 50 + (Math.cos(i) * 15);
          
          fixedPositions.push({
              x: Math.max(10, Math.min(x, containerWidth - 58)),
              y: Math.max(10, Math.min(y, containerHeight - 74)),
              rotation: (Math.sin(i * 0.5) * 25)
          });
      }
      
      currentDeck.forEach((card, index) => {
          const cardDiv = document.createElement('div');
          cardDiv.className = 'wide-arc-card';
          
          // Orijinal kartın pozisyonunu bul
          const originalIndex = tarotDeck.findIndex(c => c.name === card.name);
          const pos = fixedPositions[originalIndex] || fixedPositions[index];
          
          cardDiv.style.left = `${pos.x}px`;
          cardDiv.style.top = `${pos.y}px`;
          cardDiv.style.transform = `rotate(${pos.rotation}deg)`;
          
          cardDiv.onclick = () => selectCardFromDeck(index);
          
          // TÜM KARTLAR 🃏 EMOJİ
          cardDiv.textContent = '🃏';
          cardDiv.title = `${card.name} - Click to select`;
          deckDiv.appendChild(cardDiv);
      });
  }
  
  function updateDrawnDisplay() {
      const drawnDiv = document.getElementById('drawnCards');
      const returnBtn = document.getElementById('returnBtn');
      
      if (selectedCards.length > 0) {
          returnBtn.style.display = 'inline-block';
      } else {
          returnBtn.style.display = 'none';
      }
      
      if (selectedCards.length === 0) {
          drawnDiv.innerHTML = '<p style="color: #a8a8a8; font-style: italic; text-align: center; width: 100%; margin: 0;">Select cards from deck...</p>';
      } else {
          drawnDiv.innerHTML = '';
          drawnDiv.style.justifyContent = 'flex-start';
          selectedCards.forEach((card, index) => {
              const cardDiv = document.createElement('div');
              cardDiv.className = 'drawn-card';
              
              // TÜM KARTLAR 🃏 EMOJİ
              cardDiv.textContent = '🃏';
              cardDiv.title = `${card.name} - Selected`;
              
              // Kart sırasına göre animasyon
              cardDiv.style.animationDelay = `${index * 0.1}s`;
              cardDiv.style.animation = 'cardAppear 0.4s ease forwards';
              
              drawnDiv.appendChild(cardDiv);
          });
      }
      
      // Selection status update
      updateSelectionStatus();
  }
  
  function updateSelectionStatus() {
      const statusSpan = document.getElementById('selectionStatus');
      if (selectedCards.length > 0) {
          const lastCard = selectedCards[selectedCards.length - 1];
          statusSpan.textContent = `Card selected: ${lastCard.name}! (${selectedCards.length}/5 cards selected)`;
      } else {
          statusSpan.textContent = '';
      }
  }
  
  function updateCounters() {
      document.getElementById('cardsLeft').textContent = currentDeck.length;
  }
  
  function updateReadButton() {
      const readBtn = document.getElementById('readCardsBtn');
      if (selectedCards.length > 0) {
          readBtn.disabled = false;
          readBtn.style.opacity = '1';
      } else {
          readBtn.disabled = true;
          readBtn.style.opacity = '0.5';
      }
  }
  
  function updateStatus(message) {
      document.getElementById('status').textContent = message;
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
      initGame();
  });