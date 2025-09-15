import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import AOS from "aos";
import ChatRoom from "./components/ChatRoom";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
// import Experience from "./components/Experience";
// import Education from "./components/Education";

AOS.init();

/* ---------------- ROLE SWITCHER COMPONENT ---------------- */
function RoleSwitcher() {
  const roles = [
    "Backend Developer",
    "Software Engineer",
    "UI/UX Designer",
    "Software Tester",
    "Fullstack Developer",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);


   return (
    <div className="flex flex-wrap items-center gap-2 mb-6 text-2xl font-semibold">
      <span className="text-white">I'm</span>

      {/* Kotak tetap */}
      <div className="bg-blue-700 text-white px-4 py-2 rounded-lg relative min-w-[270px] h-[48px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
         <motion.span
  key={roles[index]}
  initial={{ opacity: 0, y: 30 }}        // masuk dari bawah
  animate={{ opacity: 1, y: 0 }}        // posisi normal
  exit={{ opacity: 0, y: -30 }}         // keluar ke atas
  transition={{ duration: 0.5, ease: "easeInOut" }}
  className="absolute"
>
  {roles[index]}
</motion.span>

        </AnimatePresence>
      </div>
    </div>
  );
}
/* --------------------------------------------------------- */

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
const [isCVOpen, setIsCVOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Redirect handling
  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";
    if (isReload) {
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Background Aurora */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#60A5FA", "#3B82F6", "#2563EB"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isCVOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="bg-white w-[80%] max-w-3xl p-4 rounded-lg relative">
     <button
  onClick={() => setIsCVOpen(false)}
  className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center border border-black rounded-full bg-black hover:bg-gray-800 transition-colors"
>
  <span className="text-white font-bold text-xl">&times;</span>
</button>

      <iframe
        src="./assets/CV.pdf"
        className="w-full h-[80vh]"
        title="CV"
      ></iframe>
    </div>
  </div>
)}

        {/* Hero Section */}
        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText
                text="Deni Purwanto"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </h1>

            {/* Role Switcher */}
            <RoleSwitcher />

           {/* Sosial Media */}
<div className="flex items-center gap-4 mb-6">
  <a
    href="https://github.com/denipurwanto10"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full border border-gray-700 bg-[#1a1a1a] hover:bg-[#222] transition-colors"
  >
    <FaGithub className="text-2xl text-white" />
  </a>

  <a
    href="https://instagram.com/deniiprwnt"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full border border-gray-700 bg-[#1a1a1a] hover:bg-[#222] transition-colors"
  >
    <FaInstagram className="text-2xl text-white" />
  </a>

  <a
    href="https://linkedin.com/in/deniiprwnt"
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full border border-gray-700 bg-[#1a1a1a] hover:bg-[#222] transition-colors"
  >
    <FaLinkedin className="text-2xl text-white" />
  </a>
</div>


<div className="flex items-center sm:gap-4 gap-2">
  <button
  onClick={() => setIsCVOpen(true)}
  className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-900 hover:bg-[#222] transition-colors"
>
  <ShinyText
    text="View CV"
    disabled={false}
    speed={3}
    className="custom-class"
  />
</button>


  <a
    href="#project"
     className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-900 hover:bg-[#222] transition-colors"
  >
    <ShinyText
      text="Explore My Projects"
      disabled={false}
      speed={3}
      className="custom-class"
    />
  </a>
</div>

          </div>

          <div className="flex justify-center-safe md:justify-end animate__animated animate__fadeInUp animate__delay-4s">
           <ProfileCard
  handle="deniiprwnt"
  status="Online"
  contactText="Contact Me"
  avatarUrl="./assets/deni.png"
  showUserInfo={true}
  enableTilt={true}
  enableMobileTilt={false}
  onContactClick={() => window.open("mailto:denipurwanto800@gmail.com", "_blank")}
/>

          </div>
        </div>

        {/* About Section */}
        <div
          className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px]border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6"
          id="about"
        >
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  About Me
                </h2>

                <BlurText
                  text="I’m Deni Purwanto, an Informatics Engineering graduate from Langlangbuana University with experience as a Web Developer and Laboratory Assistant. Skilled in designing and developing interactive, responsive, and user-friendly web applications. I possess strong analytical skills, thoroughness, and adaptability, with experience working both independently and collaboratively. I am committed to continuous learning and delivering innovative digital solutions with real impact."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      7<span className="text-blue-600">+</span>
                    </h1>
                    <p>Project Finished</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      4<span className="text-blue-600">+</span>
                    </h1>
                    <p>Years of Experience</p>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="600"
                    data-aos-once="true"
                  >
                    <h1 className="text-3xl md:text-4xl mb-1">
                      3.46<span className="text-blue-600">/4.00</span>
                    </h1>
                    <p>GPA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center ">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools mt-32">
<h1
  className="text-4xl/snug font-bold mb-4 text-center"
  data-aos="fade-up"
  data-aos-duration="1000"
  data-aos-once="true"
>
  Tools & Technologies
</h1>
<p
  className="w-2/5 text-base/loose opacity-50 text-center mx-auto"
  data-aos="fade-up"
  data-aos-duration="1000"
  data-aos-delay="300"
  data-aos-once="true"
>
  My Professional Skills
</p>

          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listTools.map((tool) => (
              <div
                key={tool.id}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={tool.dad}
                data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
<div className="proyek mt-10 py-10" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div> 

<h1 id="resume" className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
  Resume
</h1> 

<p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
  Discover my academic background and work experience
</p> 

<div className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6" id="about">
  <div className="flex flex-col md:flex-row items-start justify-between gap-10 pt-0 px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">

    {/* Education Section */}
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-bold mb-6 text-white">Education</h2>

      <div className="relative ml-6">
        {/* Garis utama */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-white"></div>

        {/* Timeline Item 1 */}
        <div className="relative pl-6 mb-10">
          {/* Bulatan dengan gambar */}
           <div className="absolute -left-[16px] top-0 w-8 h-8 rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-black">
            <img
              src="./assets/tools/unla.png" // logo laboratorium
              alt="Lab"
              className="w-5 h-5 object-contain"
            />
          </div>

          <h3 className="text-lg font-semibold">Bachelor of Informatics Engineering</h3>
          <p className="text-gray-400">Universitas Langlangbuana.</p>
          <span className="text-gray-400 text-sm border border-gray-600 px-3 py-1 rounded-lg bg-[#0a0a0a] mt-2 inline-block">
            Jan 2021 – Jun 2025
          </span>
          <div className="space-y-2 mt-3">
            <div className="p-3 border rounded-lg bg-gray-800/50">
              <ul className="list-disc pl-5 space-y-1">
                <li>Won second place in the UI/UX Competition organized by HARTIK (2023)</li>
                <li>Received a certificate of Outstanding Student Award at the 42nd Anniversary of Langlangbuana University (2024).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative pl-6 mb-10">
          {/* Bulatan dengan gambar */}
           <div className="absolute -left-[16px] top-0 w-8 h-8 rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-black">
            <img
              src="./assets/tools/angkasa.png" // logo laboratorium
              alt="Lab"
              className="w-5 h-5 object-contain"
            />
          </div>

          <h3 className="text-lg font-semibold">Software Engineering</h3>
          <p className="text-gray-400">SMK Angkasa 1 Margahayu</p>
          <span className="text-gray-400 text-sm border border-gray-600 px-3 py-1 rounded-lg bg-[#0a0a0a] mt-2 inline-block">
            2018 – 2021
          </span>
        </div>
      </div>
    </div>

    {/* Professional Experience Section */}
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-bold mb-6 text-white">Experience</h2>

      <div className="relative ml-6">
        {/* Garis utama */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-white"></div>

        {/* Timeline Item 1 */}
        <div className="relative pl-6 mb-10">
          {/* Bulatan dengan gambar */}
         <div className="absolute -left-[16px] top-0 w-8 h-8 rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-black">
            <img
              src="./assets/tools/logo.png" // logo laboratorium
              alt="Lab"
              className="w-5 h-5 object-contain"
            />
          </div>

          <h3 className="text-lg font-semibold">Web Developer</h3>
          <p className="text-gray-400">Dinas Perdagangan dan Perindustrian Kabupaten Bandung</p>
          <span className="text-gray-400 text-sm border border-gray-600 px-3 py-1 rounded-lg bg-[#0a0a0a] mt-2 inline-block">
            Jan 2025 - Jun 2025
          </span>

          <div className="space-y-2 mt-3">
            <div className="p-3 border rounded-lg bg-gray-800/50">
              <ul className="list-disc pl-5 space-y-1">
                <li>Developed a web-based MSME information system with 40% faster data efficiency.</li>
                <li>Integrated Leaflet.js & QGIS for an interactive MSME geospatial map.</li>
                <li>Built a RESTful API using Node.js with parameterized queries to ensure data security.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="relative pl-6 mb-10">
          {/* Bulatan dengan gambar */}
        <div className="absolute -left-[16px] top-0 w-8 h-8 rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-black">
            <img
              src="./assets/tools/unla.png" // logo laboratorium
              alt="Lab"
              className="w-5 h-5 object-contain"
            />
          </div>

          <h3 className="text-lg font-semibold">Laboratory Assistant</h3>
          <p className="text-gray-400">Universitas Langlangbuana</p>
          <span className="text-gray-400 text-sm border border-gray-600 px-3 py-1 rounded-lg bg-[#0a0a0a] mt-2 inline-block">
            March 2022 - July 2024
          </span>
          <div className="space-y-2 mt-3">
            <div className="p-3 border rounded-lg bg-gray-800/50">
              <ul className="list-disc pl-5 space-y-1">
                <li>Guided more than 50 students in Algorithm, Database, Basic Web and Web Framework practicums.</li>
                <li>Designed and developed 4 practicum modules aligned with the latest curriculum.</li>
                <li>Managed practicum implementation each semester, from preparation to evaluation.</li>
                <li>Maintained 20+ laboratory computers and software.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>




     
        {/* Projects Section */}
        <div
          className="proyek mt-32 py-10"
          id="project"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        ></div>
        <h1
          className="text-center text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Project
        </h1>
        <p
          className="text-base/loose text-center opacity-50"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          data-aos-once="true"
        >
          Showcasing a selection of projects that reflect my skills, creativity,
          and passion for building meaningful digital experiences.
        </p>
        <div className="proyek-box mt-14">
          <div
          className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px]border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6"
          id="about"
        >
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick}
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>

        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-0" id="contact">
          <h1
            className="text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact & Chat
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Get in touch with me or chat in real-time
          </p>

          {/* Container dua kolom */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Chat Room di kiri */}
            {/* <div className="flex-1 bg-zinc-800 p-6 rounded-md" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ChatRoom />
            </div> */}

            {/* Contact Form di kanan */}
            <div className="flex-1">
              <form
                action="https://formsubmit.co/rissoppa21@gmail.com"
                method="POST"
                className="bg-zinc-800 p-10 w-full rounded-md"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Input Name..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Input Email..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="7"
                      placeholder="Message..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors"
                    >
                      <ShinyText text="Send" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App