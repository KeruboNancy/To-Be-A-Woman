document.addEventListener("DOMContentLoaded", () => {

  function openTab(evt, tabName) {
    const tabs = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
  }

  window.openTab = openTab;


  const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg"
  ];

  let slideIndex = 0;
  const slideImg = document.getElementById("slide");

  if (slideImg) {
    slideImg.src = images[slideIndex];
  }

  window.nextSlide = function () {
    if (!slideImg) return;

    slideIndex++;
    if (slideIndex < images.length) {
      slideImg.src = images[slideIndex];
    } else {
      alert("Surprise! You've viewed all the slides 🎉");
      slideIndex = images.length - 1;
    }
  };

  window.prevSlide = function () {
    if (!slideImg) return;

    if (slideIndex > 0) {
      slideIndex--;
      slideImg.src = images[slideIndex];
    }
  };

  const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    alert("You're on your way to discovering your inner strength!");
  });

  exploreBtn.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "green";
    e.target.style.color = "#ffffff";
  });

  exploreBtn.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "#ba68c8";
    e.target.style.color = ""; 
  });
}


  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      alert("You pressed Enter! Ready to dive in?");
    }
  });

  document.body.addEventListener("dblclick", () => {
    alert("Double click detected! You're full of energy today 💫");
  });


  const form = document.getElementById("bookingForm");
  if (form) {
    const feedback = document.getElementById("feedback");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      let isValid = true;
      feedback.textContent = "";

      if (!name) {
        feedback.textContent += "Please enter your name.\n";
        isValid = false;
      }

      if (
        !email ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ) {
        feedback.textContent += "Please enter a valid email address.\n";
        isValid = false;
      }

      if (isValid) {
        feedback.textContent = "✅ Thank you for booking! We'll be in touch soon.";
        feedback.style.color = "green";

        setTimeout(() => {
          form.reset();
          feedback.textContent = "";
          feedback.style.color = "";
        }, 5000);
      } else {
        feedback.style.color = "red";
      }
    });
  }



  const testimonialsContainer = document.getElementById("testimonials");

  window.addEventListener("DOMContentLoaded", () => {
    if (!testimonialsContainer) return;

    fetch("http://localhost:3000/api/testimonials")
      .then(res => res.json())
      .then(testimonials => {
        testimonials.forEach(t => {
          const div = document.createElement("div");
          div.className = "testimonial";
          div.innerHTML = `
            <p>"${t.text}"</p>
            <strong>— Anonymous 🌸</strong>
          `;
          testimonialsContainer.appendChild(div);
        });
      })
      .catch(err => {
        console.error("Failed to load testimonials:", err);
      });
  });




  const testimonialForm = document.getElementById("testimonialForm");
  const testimonialText = document.getElementById("testimonialText");

  if (testimonialForm && testimonialsContainer) {
    testimonialForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const text = testimonialText.value.trim();
      if (!text) return;

    
      const newTestimonial = document.createElement("div");
      newTestimonial.className = "testimonial";
      newTestimonial.innerHTML = `
        <p>"${text}"</p>
        <strong>— Anonymous 🌸</strong>
      `;
      testimonialsContainer.prepend(newTestimonial);

      testimonialText.value = ""; 

      
      fetch("http://localhost:3000/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      }).catch(err => {
        console.error("Error submitting testimonial:", err);
        alert("Your testimonial was shown but could not be saved.");
      });
    });
  }


  


  function submitVote(voteType) {
    const voteFeedback = document.getElementById("voteFeedback");

    voteFeedback.textContent = "⏳ Submitting your vote...";
    voteFeedback.style.color = "#2196f3";

    fetch("http://localhost:3000/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vote_type: voteType })
    })
      .then(response => {
        if (response.ok) {
          voteFeedback.textContent = "✅ Your vote has been recorded!";
          voteFeedback.style.color = "green";
        } else {
          voteFeedback.textContent = "❌ Something went wrong.";
          voteFeedback.style.color = "red";
        }
      })
      .catch(error => {
        console.error("Error submitting vote:", error);
        voteFeedback.textContent = "⚠️ Can't reach server. Are you online?";
        voteFeedback.style.color = "orange";
      })
      .finally(() => {
        setTimeout(() => {
          voteFeedback.textContent = "";
          voteFeedback.style.color = "";
        }, 5000);
      });
  }

  
  
  const voteButtons = document.querySelectorAll(".vote-section button");
  voteButtons.forEach(button => {
    let clickTimeout;

    button.addEventListener("click", () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
        alert("Ooops, click once to register your thoughts");
      } else {
        clickTimeout = setTimeout(() => {
          alert("You're not wrong in thinking that way");
          const voteType = button.getAttribute("data-vote");
          submitVote(voteType);
          clickTimeout = null;
        }, 300);
      }
    });
  });
});