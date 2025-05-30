function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

// Rate limiting variables
const MESSAGE_LIMIT = 5;
const TIME_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds

// Check and initialize message tracking in sessionStorage
function initMessageTracking() {
  const messageData = sessionStorage.getItem("messageData");
  if (!messageData) {
    sessionStorage.setItem(
      "messageData",
      JSON.stringify({ count: 0, firstMessageTime: null })
    );
  }
}

function getMessageData() {
  return JSON.parse(sessionStorage.getItem("messageData"));
}

function updateMessageData(count, firstMessageTime) {
  sessionStorage.setItem(
    "messageData",
    JSON.stringify({ count, firstMessageTime })
  );
}

function resetMessageData() {
  sessionStorage.setItem(
    "messageData",
    JSON.stringify({ count: 0, firstMessageTime: null })
  );
}

function checkRateLimit() {
  const messageData = getMessageData();
  const now = Date.now();

  // If no messages yet, allow sending
  if (!messageData.firstMessageTime) {
    return true;
  }

  // Check if 5 minutes have passed since the first message
  const timeSinceFirstMessage = now - messageData.firstMessageTime;
  if (timeSinceFirstMessage >= TIME_WINDOW) {
    resetMessageData();
    return true;
  }

  // Check if message count is within limit
  return messageData.count < MESSAGE_LIMIT;
}

function incrementMessageCount() {
  const messageData = getMessageData();
  const now = Date.now();
  const firstMessageTime = messageData.firstMessageTime || now;
  const newCount = messageData.count + 1;
  updateMessageData(newCount, firstMessageTime);
}

function formatCountdownTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function startCountdownTimer() {
  const messageData = getMessageData();
  if (!messageData.firstMessageTime) return;

  const timerElement = document.getElementById("countdown-timer");
  if (!timerElement) return;

  const updateTimer = () => {
    const now = Date.now();
    const timeSinceFirstMessage = now - messageData.firstMessageTime;
    const remainingTime = TIME_WINDOW - timeSinceFirstMessage;

    if (remainingTime <= 0) {
      resetMessageData();
      document.getElementById("rate-limit-modal").classList.add("hidden");
      clearInterval(timerInterval);
      return;
    }

    timerElement.textContent = formatCountdownTime(remainingTime);
  };

  // Update immediately
  updateTimer();
  // Update every second
  const timerInterval = setInterval(updateTimer, 1000);
}

function showRateLimitModal() {
  const modal = document.getElementById("rate-limit-modal");
  modal.classList.remove("hidden");
  startCountdownTimer(); // Start the timer when the modal is shown
}

document.getElementById("send-btn").addEventListener("click", sendMessage);
document
  .getElementById("user-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

document.getElementById("exit-btn").addEventListener("click", function () {
  window.location.href = "/";
});

document.getElementById("homepage-btn").addEventListener("click", function () {
  window.location.href = "/";
});

function sendMessage() {
  // Check rate limit before proceeding
  if (!checkRateLimit()) {
    showRateLimitModal();
    return;
  }

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const placeholder = document.getElementById("placeholder-text");
  const question = input.value.trim();

  if (question === "") return;

  // Hide placeholder immediately before adding any message
  placeholder.classList.add("hidden");

  // Add user label
  const userLabel = document.createElement("div");
  userLabel.className = "user-label";
  userLabel.textContent = "User";
  chatBox.appendChild(userLabel);

  // Add user message
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = question;
  chatBox.appendChild(userDiv);

  // Add timestamp and ticks for user message
  const userTimeTicks = document.createElement("div");
  userTimeTicks.className = "time-ticks user-time-ticks";
  const time = formatTime(new Date());
  userTimeTicks.innerHTML = `${time} <span class="double-ticks"></span>`;
  chatBox.appendChild(userTimeTicks);

  // Increment message count
  incrementMessageCount();

  // Clear input
  input.value = "";

  // Get persona from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const persona = urlParams.get("persona");

  // Fetch persona's response
  fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, persona_id: persona }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Add persona label
      const personaLabel = document.createElement("div");
      personaLabel.className = "hitesh-label";
      personaLabel.textContent = persona === "hitesh" ? "Hitesh" : "Piyush";
      chatBox.appendChild(personaLabel);

      // Add persona message
      const personaDiv = document.createElement("div");
      personaDiv.className = "hitesh-message";
      personaDiv.textContent = data.response;
      chatBox.appendChild(personaDiv);

      // Add timestamp and ticks for persona message
      const personaTimeTicks = document.createElement("div");
      personaTimeTicks.className = "time-ticks hitesh-time-ticks";
      const personaTime = formatTime(new Date());
      personaTimeTicks.innerHTML = `${personaTime} <span class="double-ticks"></span>`;
      chatBox.appendChild(personaTimeTicks);

      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch((error) => console.error("Error:", error));
}

// Initialize message tracking on page load
initMessageTracking();

// Create particle effect
const particlesContainer = document.getElementById("particles-container");
const particleCount = 80;

// Create particles
for (let i = 0; i < particleCount; i++) {
  createParticle();
}

function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random size (small)
  const size = Math.random() * 3 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Initial position
  resetParticle(particle);

  particlesContainer.appendChild(particle);

  // Animate
  animateParticle(particle);
}

function resetParticle(particle) {
  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;

  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.opacity = "0";

  return {
    x: posX,
    y: posY,
  };
}

function animateParticle(particle) {
  // Initial position
  const pos = resetParticle(particle);

  // Random animation properties
  const duration = Math.random() * 10 + 10;
  const delay = Math.random() * 5;

  // Animate with GSAP-like timing
  setTimeout(() => {
    particle.style.transition = `all ${duration}s linear`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;

    // Move in a slight direction
    const moveX = pos.x + (Math.random() * 20 - 10);
    const moveY = pos.y - Math.random() * 30; // Move upwards

    particle.style.left = `${moveX}%`;
    particle.style.top = `${moveY}%`;

    // Reset after animation completes
    setTimeout(() => {
      animateParticle(particle);
    }, duration * 1000);
  }, delay * 1000);
}

// Mouse interaction
document.addEventListener("mousemove", (e) => {
  // Create particles at mouse position
  const mouseX = (e.clientX / window.innerWidth) * 100;
  const mouseY = (e.clientY / window.innerHeight) * 100;

  // Create temporary particle
  const particle = document.createElement("div");
  particle.className = "particle";

  // Small size
  const size = Math.random() * 4 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Position at mouse
  particle.style.left = `${mouseX}%`;
  particle.style.top = `${mouseY}%`;
  particle.style.opacity = "0.6";

  particlesContainer.appendChild(particle);

  // Animate outward
  setTimeout(() => {
    particle.style.transition = "all 2s ease-out";
    particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
    particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
    particle.style.opacity = "0";

    // Remove after animation
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }, 10);

  // Subtle movement of gradient spheres
  const spheres = document.querySelectorAll(".gradient-sphere");
  const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

  spheres.forEach((sphere) => {
    const currentTransform = getComputedStyle(sphere).transform;
    sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
