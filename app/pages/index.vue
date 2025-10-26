<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- === NAVBAR === -->
  <nav class="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
    <ul class="flex justify-center gap-8 py-4 text-lg font-medium">
      <li><a href="#animation" :class="{ active: activeSection === 'animation' }" class="nav-link">Animation</a></li>
      <li><a href="#profil" :class="{ active: activeSection === 'profil' }" class="nav-link">Profil</a></li>
      <li><a href="#competences" :class="{ active: activeSection === 'competences' }" class="nav-link">Compétences</a></li>
      <li><a href="#travail" :class="{ active: activeSection === 'travail' }" class="nav-link">Travail</a></li>
      <li><a href="#ecole" :class="{ active: activeSection === 'ecole' }" class="nav-link">École</a></li>
      <li><a href="#projets" :class="{ active: activeSection === 'projets' }" class="nav-link">Projets</a></li>
      <li><a href="#contact" :class="{ active: activeSection === 'contact' }" class="nav-link">Contact</a></li>
    </ul>
  </nav>

  <!-- === SCROLL TARGET for "Animation" (top anchor) === -->
<div id="animation" class="h-screen relative scroll-mt-0">
  <LiquidBlobs />
</div>


  <!-- === HERO SECTION === -->
  <section id="home" class="relative flex flex-col items-center justify-center h-[220vh] text-white text-center">
    <p class="text-lg text-gray-300">Continuez vers le bas pour explorer</p>
  </section>

 <!-- === PROFILE OVER IMAGE (replace your old #profil section) === -->
<section id="profil" class="relative h-screen">
  <!-- full original image (no dark filter) -->
  <img
    src="~/assets/pic.jpg"
    alt="Background"
    class="absolute inset-0 w-full h-full object-cover"
  />

  <!-- PROFILE CARD WITH FADE-IN -->
<div
  ref="profileCard"
  class="absolute left-1/2 -translate-x-1/2 bottom-[25vh] z-10 text-center opacity-0 translate-y-10 transition-all duration-[1500ms] ease-[cubic-bezier(.2,.9,.2,1)]"
>
  <div class="flex flex-col items-center gap-6 bg-black/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-indigo-400/30">
    <img
      src="~/assets/profile.png"
      alt="Profile"
      class="w-56 h-56 rounded-full border-4 border-indigo-400 shadow-lg"
    />
    <div class="max-w-2xl">
      <h1 class="text-5xl font-bold mb-3 text-indigo-300 drop-shadow-md">Raúl González</h1>
      <p class="text-xl text-gray-100 leading-relaxed drop-shadow-md">
        Étudiant à <span class="text-indigo-400">EPITECH</span> à la recherche d'un poste d'alternance.<br />
        De <span class="text-indigo-300">Las Vegas, Nevada</span>, désormais basé à <span class="text-indigo-300">Strasbourg, Alsace</span>.
      </p>
    </div>
  </div>
</div>

</section>



  <!-- === COMPÉTENCES (Programming Knowledge) === -->
  <section id="competences" class="bg-gradient-to-b from-[#0b0b14] to-[#121225] text-white py-24">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        Mes compétences en programmation
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="p-6 bg-[#1a1a2e]/60 rounded-2xl shadow-lg hover:scale-105 hover:bg-[#1f1f3a] transition-all">
          <h3 class="text-2xl font-semibold text-indigo-400 mb-2">C# & ASP.NET</h3>
          <p class="text-gray-300">Systèmes Backend & applis de web.</p>
        </div>
        <div class="p-6 bg-[#1a1a2e]/60 rounded-2xl shadow-lg hover:scale-105 hover:bg-[#1f1f3a] transition-all">
          <h3 class="text-2xl font-semibold text-teal-400 mb-2">Fullstack web</h3>
          <p class="text-gray-300">Fullstack development web avec une preference pour Nuxt & Tailwind dans le front, Postman et Laravel pour le back.</p>
        </div>
        <div class="p-6 bg-[#1a1a2e]/60 rounded-2xl shadow-lg hover:scale-105 hover:bg-[#1f1f3a] transition-all">
          <h3 class="text-2xl font-semibold text-yellow-400 mb-2">Java</h3>
          <p class="text-gray-300">Applications et programmation oriente aux objets.</p>
        </div>
        <div class="p-6 bg-[#1a1a2e]/60 rounded-2xl shadow-lg hover:scale-105 hover:bg-[#1f1f3a] transition-all">
          <h3 class="text-2xl font-semibold text-pink-400 mb-2">Python</h3>
          <p class="text-gray-300">Programmation, taches de backend et applis.</p>
        </div>
      </div>

      <!-- === SPOKEN LANGUAGES SECTION === -->
      <div class="max-w-3xl mx-auto mt-12">
        <h3 class="text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
          Mes langues
        </h3>
        <ul class="grid sm:grid-cols-2 gap-6 text-gray-200 text-lg">
          <li><span class="text-indigo-400 font-semibold">English:</span> Natif</li>
          <li><span class="text-indigo-400 font-semibold">Spanish:</span> Natif</li>
          <li><span class="text-indigo-400 font-semibold">French:</span> Très avancé</li>
          <li><span class="text-indigo-400 font-semibold">Italian:</span> Professionnel</li>
          <li><span class="text-indigo-400 font-semibold">German:</span> Semi-professionnel</li>
        </ul>
        
        <!-- requested line before Travail -->
        <p class="mt-8 text-lg text-gray-300 italic">Mais avant ça...</p>
      </div>
    </div>
  </section>

  <!-- === TRAVAIL (this is the Journey/Work section) === -->
  <section id="travail" class="bg-[#111122] text-white py-24">
    <div class="max-w-6xl mx-auto px-6 text-center mb-10">
      <h2 class="text-4xl font-bold">J'étais...</h2>
      <p class="text-gray-300 max-w-2xl mx-auto">Voici mes expériences professionnelles.</p>
    </div>

    <div class="max-w-6xl mx-auto space-y-16 px-6">
      <div
        v-for="(item, i) in journeySections"
        :key="i"
        :ref="el => sectionRefs[i] = el"
        class="flex flex-col md:flex-row items-center gap-8 md:gap-12 group"
        :class="i % 2 === 0 ? '' : 'md:flex-row-reverse'"
        :style="{
          transform: visibleSections[i] ? 'translateY(0)' : 'translateY(80px)',
          opacity: visibleSections[i] ? 1 : 0,
          transition: 'all 700ms cubic-bezier(.2,.9,.2,1)'
        }"
        @mouseenter="pauseSlides(i)"
        @mouseleave="resumeSlides(i)"
      >
        <!-- IMAGE / SLIDES -->
        <div class="md:w-1/2 w-full">
          <div class="h-88 md:h-96 bg-gray-700 rounded-2xl overflow-hidden shadow-lg">
            <transition name="fade" mode="out-in">
              <img
                v-if="item.slides"
                :key="currentSlide[i]"
                :src="item.slides[currentSlide[i]]"
                class="w-full h-full object-cover"
                alt=""
              />
              <img
                v-else
                :src="item.image"
                class="w-full h-full object-cover"
                alt=""
              />
            </transition>
          </div>
        </div>

        <!-- TEXT -->
        <div class="md:w-1/2 w-full">
          <h3 class="text-2xl md:text-3xl font-semibold mb-3">{{ item.title }}</h3>
          <p class="text-gray-300 leading-relaxed">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- === ÉCOLE (timeline) - staggered layout, large logos) === -->
<section id="ecole" class="py-20 bg-gray-900 text-white relative overflow-hidden">
  <h2 class="text-4xl font-bold text-center mb-20">Mon parcours scolaire</h2>

  <div class="relative max-w-5xl mx-auto">
    <!-- vertical center line -->
    <div class="absolute left-1/2 top-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 h-full"></div>

    <!-- timeline items -->
    <div class="space-y-24">
      <div
        v-for="(item, i) in timeline"
        :key="i"
        class="relative flex items-center justify-between w-full"
      >
        <!-- LEFT SIDE ITEMS -->
        <div
          v-if="i % 2 === 0"
          class="w-1/2 pr-10 flex justify-end"
        >
          <div
            class="bg-gray-800 p-6 rounded-xl shadow-lg w-80 transform transition-all duration-700 hover:scale-105"
            :class="{ 'translate-y-6': i % 2 === 0 }"
          >
            <h4 class="text-xl font-semibold mb-2 text-indigo-400">{{ item.year }}</h4>
            <p class="text-gray-200">{{ item.event }}<br></br>{{ item.desc }}</p>
          </div>
        </div>

        <!-- DOT -->
        <div class="absolute left-1/2 transform -translate-x-1/2 bg-indigo-500 w-6 h-6 rounded-full border-4 border-gray-900 z-10"></div>

        <!-- RIGHT SIDE IMAGE -->
        <div
          v-if="i % 2 === 0"
          class="w-1/2 pl-10 flex justify-start"
        >
          <img
            v-if="item.logo"
            :src="item.logo"
            alt="school logo"
            class="w-40 h-40 object-contain rounded-xl shadow-lg bg-gray-800 p-2"
          />
        </div>

        <!-- MIRROR FOR ODD ITEMS -->
        <template v-else>
          <div class="w-1/2 pr-10 flex justify-end">
            <img
              v-if="item.logo"
              :src="item.logo"
              alt="school logo"
              class="w-40 h-40 object-contain rounded-xl shadow-lg bg-gray-800 p-2"
            />
          </div>
          <div class="w-1/2 pl-10 flex justify-start">
            <div
              class="bg-gray-800 p-6 rounded-xl shadow-lg w-80 transform transition-all duration-700 hover:scale-105"
              :class="{ '-translate-y-6': i % 2 !== 0 }"
            >
              <h4 class="text-xl font-semibold mb-2 text-indigo-400">{{ item.year }}</h4>
              <p class="text-gray-200">{{ item.event }}<br></br>{{ item.desc }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</section>



        


  <!-- === PROJECTS SECTION === -->
<section id="projets" class="py-28 bg-[#0d0d18] text-white">
  <h2 class="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
    Projets
  </h2>

  <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 px-6">
    <!-- === PROJECT CARD 1 === -->
    <a
      href="https://github.com/Raul59209/RECIPATOR"
      target="_blank"
      class="group bg-[#1a1a2e]/80 rounded-3xl p-8 hover:-translate-y-3 transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
    >
      <div class="overflow-hidden rounded-2xl mb-6">
        <img
          src="~/assets/projects/recipator.png"
          alt="Recipator"
          class="h-72 w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <h3 class="text-3xl font-semibold mb-3 text-indigo-400">RECIPATOR</h3>
      <p class="text-gray-300 text-lg leading-relaxed">
        En tant qu’américain, j'ai souvent besoin de convertir des recettes. Ce programme le fera.
        Déjà disponible en sa cinquième version !
      </p>
    </a>

    <!-- === PROJECT CARD 2 === -->
    <a
      href="#"
      class="group bg-[#1a1a2e]/80 rounded-3xl p-8 hover:-translate-y-3 transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
    >
      <div class="overflow-hidden rounded-2xl mb-6">
        <img
          src="~/assets/projects/jobwebsite.png"
          alt="Job Tracker"
          class="h-72 w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <h3 class="text-3xl font-semibold mb-3 text-purple-400">Job Tracker</h3>
      <p class="text-gray-300 text-lg leading-relaxed">
        Projet réalisé dans un cadre d’apprentissage : mini-site d’annonces d’emploi avec base de données,
        affichage web, API et authentification.
      </p>
    </a>

    <!-- === PROJECT CARD 3 === -->
    <a
      href="https://github.com/Raul59209/raul59209.github.io"
      target="_blank"
      class="group bg-[#1a1a2e]/80 rounded-3xl p-8 hover:-translate-y-3 transition-all shadow-2xl hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]"
    >
      <div class="overflow-hidden rounded-2xl mb-6">
        <img
          src="~/assets/projects/cvsite.png"
          alt="CV en ligne"
          class="h-72 w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <h3 class="text-3xl font-semibold mb-3 text-pink-400">CV en ligne</h3>
      <p class="text-gray-300 text-lg leading-relaxed">
        Projet réalisé pour l’école : créer mon CV en tant que site web moderne et interactif.
      </p>
    </a>
  </div>
</section>



  <!-- === CONTACT SECTION === -->
<section id="contact" class="bg-[#080812] text-white py-20">
  <div class="max-w-3xl mx-auto px-6 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
    <p class="text-gray-400 mb-8">
      Avez-vous un projet ou des questions ? Contactez-moi via email ou sur LinkedIn.
    </p>

    <div class="flex justify-center gap-6 mb-10">
      <a class="hover:text-indigo-400 transition" href="mailto:raul.gonzalez@epitech.eu">raul.gonzalez@epitech.eu</a>
      <a class="hover:text-indigo-400 transition" href="https://www.linkedin.com/in/raúl-gonzález-821734382" target="_blank">LinkedIn</a>      <a class="hover:text-indigo-400 transition" href="https://github.com/Raul59209">GitHub</a>
    </div>

    <!-- Resume Download -->
    <a
      href="/assets/resume.pdf"
      download
      class="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
    >
      Télécharger mon CV
    </a>
  </div>
</section>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LiquidBlobs from '~/components/liquidblobs.vue'
import { nextTick } from 'vue'

const timelineRefs = ref([])

onMounted(async () => {
  await nextTick()
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10')
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  timelineRefs.value.forEach(el => el && observer.observe(el))
})

const profileCard = ref(null)

onMounted(() => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10')
          entry.target.classList.add('opacity-100', 'translate-y-0')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 }
  )
  if (profileCard.value) obs.observe(profileCard.value)
})


// NAV SPY: list matches the nav labels & section IDs
const activeSection = ref('animation')
const sections = ['animation', 'home', 'profil', 'compétences', 'travail', 'ecole', 'projets', 'contact']

let spyObserver = null
onMounted(() => {
  spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activeSection.value = entry.target.id
    })
  }, { threshold: 0.5 })

  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) spyObserver.observe(el)
  })
})
onUnmounted(() => spyObserver && spyObserver.disconnect())

// === JOURNEY DATA (slides) ===
const journeySections = ref([
  {
    title: 'Technicien de climatiseurs 2014-2025',
text: `Pendant plus de dix ans, j'ai travaillé dans notre entreprise familiale de réparation et installation de climatiseurs pour les foyers et les entreprises. Cela m'a permis de développer un caractère responsable et persévérant et cela m'a surtout permis de passer beaucoup de temps avec mon père sur les chantiers et ma mère au bureau.`,    slides: [
      new URL('~/assets/AC/crane.jpg', import.meta.url).href,
      new URL('~/assets/AC/install.jpg', import.meta.url).href,
      new URL('~/assets/AC/menadpops.JPG', import.meta.url).href,
      new URL('~/assets/AC/onroof.jpg', import.meta.url).href,
      new URL('~/assets/AC/papionroof.jpg', import.meta.url).href,
      new URL('~/assets/AC/rooftopview.jpg', import.meta.url).href,
      new URL('~/assets/AC/roofview.jpg', import.meta.url).href,
      new URL('~/assets/AC/soldering.jpg', import.meta.url).href,
      new URL('~/assets/AC/twounits.jpg', import.meta.url).href,
      new URL('~/assets/AC/mami.jpg', import.meta.url).href,
      new URL('~/assets/AC/valleyview.jpg', import.meta.url).href
    ]
  },
  {
    title: 'Massothérapeute 2017-2021',
text: `J'ai travaillé en tant que massothérapeute pendant 4 quatre ans dans le centre touristique de Las Vegas, ainsi que que dans un spa thailandais. Je formais les nouveaux massothérapeutes en leur apprenant les bases du massage thailandais comme la maîtrise de l'écoute du patient à travers le toucher, les étirements et la marche sur les patients.`,    slides: [
      new URL('~/assets/spa/spaentrance.jpg', import.meta.url).href,
      new URL('~/assets/spa/spabirthday.jpg', import.meta.url).href,
      new URL('~/assets/spa/massageuniform.jpg', import.meta.url).href,
      new URL('~/assets/spa/schedule.jpg', import.meta.url).href,
      new URL('~/assets/spa/roly1.jpg', import.meta.url).href,
      new URL('~/assets/spa/roly2.jpg', import.meta.url).href
    ]
  },
  {
    title: 'Enseignant particulier de langues',
      text: `Depuis mes études à l'université de Las Vegas, je travaille de temps en temps, selon la demande, en tant que tuteur de langues en espagnol et italien.`,
      image: new URL('~/assets/books.jpg', import.meta.url).href
  }
])

// slideshow (single interval, pause per section)
const currentSlide = ref(journeySections.value.map(() => 0))
const pausedSlides = ref(journeySections.value.map(() => false))
let slideshowInterval = null

function pauseSlides(i) { pausedSlides.value[i] = true }
function resumeSlides(i) { pausedSlides.value[i] = false }

onMounted(() => {
  slideshowInterval = setInterval(() => {
    journeySections.value.forEach((s, i) => {
      if (s.slides && !pausedSlides.value[i]) {
        currentSlide.value[i] = (currentSlide.value[i] + 1) % s.slides.length
      }
    })
  }, 3500)
})
onUnmounted(() => { clearInterval(slideshowInterval) })

// reveal for journey blocks
const sectionRefs = []
const visibleSections = ref(journeySections.value.map(() => false))
let revealObserver = null

onMounted(() => {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = sectionRefs.findIndex(el => el === entry.target)
        if (idx !== -1) visibleSections.value[idx] = true
      }
    })
  }, { threshold: 0.25 })

  sectionRefs.forEach(el => el && revealObserver.observe(el))
})
onUnmounted(() => revealObserver && revealObserver.disconnect())

// TIMELINE DATA — add logos optionally by adding `logo: new URL('~/assets/...', import.meta.url).href`
const timeline = [
  { year: '2025', event: 'EPITECH:', desc: `Apprentissage de plusieurs langues de programmation et projets.`, logo: new URL('~/assets/logo/epitech.jpeg', import.meta.url).href /* add URL(...) if you have a logo */ },
  { year: '2023-2025', event: 'ESIT:', desc: `Apprentissage de l’interprétation Français > Anglais <> Espagnol.`, logo: new URL('~/assets/logo/esit.jpg', import.meta.url).href },
  { year: '2022-2023', event: 'Université de Strasbourg:', desc: `Études en traduction juridique, droit français et britannique.`, logo: new URL('~/assets/logo/unis.jpg', import.meta.url).href },
  { year: '2016-2020', event: 'University of Las Vegas:', desc: `Études de la langue, la culture et l’histoire de la France, l’Italie et l’Espagne.`, logo: new URL('~/assets/logo/unlv.png', import.meta.url).href }
]

// simple intersection directive handler for timeline items used in template
const handleIntersect = (el) => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.classList.add('opacity-100', 'translate-y-0')
        obs.unobserve(el)
      }
    })
  }, { threshold: 0.25 })
  obs.observe(el)
}
</script>

<style scoped>
html { scroll-behavior: smooth; }

.nav-link { transition: color 0.3s; color: #ddd; }
.nav-link.active { color: #818cf8; }
.nav-link:hover { color: #a5b4fc; }

/* fade transition for slides */
.fade-enter-active, .fade-leave-active { transition: opacity 1s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Fade-in animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 1.5s ease-out forwards; }
.animate-fade-in { animation: fadeInUp 1.2s ease-out forwards; }

/* timeline & profile tweaks */
#profil img[alt="Background"] {
  /* ensure original colors, no darkening */
  filter: none;
}

/* Slightly larger timeline logos and spacing (already used classes) */
.ecole-logo {
  width: 9rem; /* 144px */
  height: 9rem;
}

/* responsive adjustments */
@media (max-width: 768px) {
  /* stack timeline items on mobile for readability */
  #ecole .grid {
    grid-template-columns: 1fr !important;
  }
  #ecole .col-start-1,
  #ecole .col-start-2 {
    justify-content: center !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  /* move profile card a bit higher on small screens so it doesn't overlap footer */
  #profil .absolute.left-1\/2 {
    bottom: 18vh;
  }
}
#ecole {
  position: relative;
}

#ecole img {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

#ecole img:hover {
  transform: scale(1.08);
  box-shadow: 0 0 25px rgba(129, 140, 248, 0.6);
}

/* for staggered animation (already handled by JS, this keeps the spacing neat) */
#ecole .opacity-0 {
  opacity: 0;
  transform: translateY(30px);
}

#ecole .opacity-100 {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s ease-out;
}

@media (max-width: 768px) {
  #ecole .space-y-24 > div {
    flex-direction: column !important;
    text-align: center !important;
  }
  #ecole img {
  width: 15rem !important;
  height: 15rem !important;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
}

</style>