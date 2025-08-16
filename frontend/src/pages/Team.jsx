import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode, FaGlobe, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Team = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'Mohit Suthar',
      role: 'Software Engineer & Tech Educator',
      bio: 'Passionate Software Developer & AI/ML Enthusiast based in India. Builds impactful digital solutions with expertise in full-stack development. SDE & AIML Enthusiast | Open Source contributor @GSSOC\'25.',
      image: 'https://avatars.githubusercontent.com/u/175955564?v=4',
      icon: <FaCode className="text-green-400" />,
      skills: ['React', 'Node.js', 'Python', 'MongoDB', 'Docker', 'AWS', 'Tailwind CSS', 'TypeScript'],
      projects: [
        'KrishiAi - AI Agricultural Platform',
        'AlloraAi CLI - AI Infrastructure Tool',
        'Agricultural E-commerce Platform',
        'Real-time Crop Monitoring Dashboard'
      ],
      social: {
        linkedin: 'https://linkedin.com/in/mohit-suthar-4136a52a6/',
        github: 'https://github.com/MohitSutharOfficial',
        website: 'https://mohitsuthar.me/',
        twitter: 'https://x.com/OfficialMsuthar',
        stackoverflow: 'https://stackoverflow.com/users/27745870/mohit-suthar',
        email: 'mailto:mohit@mohitsuthar.me'
      }
    }
  ];

  const TeamMemberCard = ({ member }) => (
    <div className="bg-white border border-green-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-green-500/30 hover:border-green-500 flex flex-col max-w-md mx-auto w-full group">
      {/* Header with circular image */}
      <div className="relative pt-8 px-6 flex flex-col items-center">
        <div className="absolute top-4 right-4 bg-green-600/20 p-2 rounded-full">
          {member.icon}
        </div>

        <div className="w-36 h-36 rounded-full border-4 border-green-500/30 overflow-hidden mb-4 group-hover:border-green-500 transition-colors duration-300 shadow-lg">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">{member.name}</h3>
        <p className="text-green-500 text-sm font-medium mb-3 text-center">{member.role}</p>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col bg-white/50">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Skills
          </h4>
          <div className="flex flex-wrap gap-2 ml-6">
            {member.skills.map((skill, index) => (
              <span key={index} className="bg-green-50 text-xs text-gray-600 px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Notable Projects
          </h4>
          <ul className="list-disc list-inside text-gray-600 text-xs ml-6 space-y-1">
            {member.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-green-200">
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="bg-green-50 p-2 rounded-full text-gray-500 hover:text-white hover:bg-[#0077b5] transition-colors"
              aria-label={`${member.name}'s LinkedIn`}>
              <FaLinkedin size={16} />
            </a>
          )}
          {member.social.github && (
            <a href={member.social.github} target="_blank" rel="noopener noreferrer"
              className="bg-green-50 p-2 rounded-full text-gray-500 hover:text-white hover:bg-[#333] transition-colors"
              aria-label={`${member.name}'s GitHub`}>
              <FaGithub size={16} />
            </a>
          )}
          {member.social.website && (
            <a href={member.social.website} target="_blank" rel="noopener noreferrer"
              className="bg-green-50 p-2 rounded-full text-gray-500 hover:text-white hover:bg-green-600 transition-colors"
              aria-label={`${member.name}'s Website`}>
              <FaGlobe size={16} />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
              className="bg-green-50 p-2 rounded-full text-gray-500 hover:text-white hover:bg-black transition-colors"
              aria-label={`${member.name}'s Twitter`}>
              <FaXTwitter size={16} />
            </a>
          )}
          {member.social.stackoverflow && (
            <a href={member.social.stackoverflow} target="_blank" rel="noopener noreferrer"
              className="bg-green-50 p-2 rounded-full text-gray-500 hover:text-white hover:bg-[#f48024] transition-colors"
              aria-label={`${member.name}'s Stack Overflow`}>
              <FaStackOverflow size={16} />
            </a>
          )}
          {member.social.email && (
            <a href={member.social.email}
              className="bg-green-50 p-2 rounded-full text-gray-500 hover:text-white hover:bg-green-600 transition-colors"
              aria-label={`Email ${member.name}`}>
              <FaEnvelope size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FEFAE0] min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="relative mb-16 py-10 px-6 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-white/40 rounded-xl"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4">Meet The Founder</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto text-sm md:text-base">
              The developer behind KrishiAi, dedicated to transforming agriculture through technology and innovation.
            </p>
          </div>
        </div>

        {/* Team member */}
        <section className="mb-20">
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Team values section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-xl font-semibold text-green-400">Our Values</h2>
            <div className="flex-grow ml-4 h-px bg-gradient-to-r from-green-600/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 border border-green-200 p-6 rounded-lg hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-400 mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Constantly pushing the boundaries of what's possible in agricultural technology, seeking creative solutions to complex farming challenges.
              </p>
            </div>

            <div className="bg-white/50 border border-green-200 p-6 rounded-lg hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-400 mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Committed to promoting sustainable farming practices that protect the environment while improving productivity and livelihoods.
              </p>
            </div>

            <div className="bg-white/50 border border-green-200 p-6 rounded-lg hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20">
              <div className="bg-green-600/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-400 mb-3">Empowerment</h3>
              <p className="text-gray-600 text-sm">
                Empowering farmers with the knowledge and tools they need to make informed decisions and improve their agricultural outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Join section */}
        <section className="bg-gradient-to-r from-green-900/30 to-white/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Join Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals who are passionate about using technology to transform agriculture.
          </p>
          <a href="/careers" className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            View Open Positions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Team;
