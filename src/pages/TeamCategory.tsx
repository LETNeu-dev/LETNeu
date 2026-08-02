import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import type { TeamMember } from "@/data/teamData";
import {
  administration,
  alumni,
  faculty,
  researchAssociatesAndGraduateTrainees,
} from "@/data/teamData";

const categories = {
  administration: {
    title: "Administration",
    description: "Meet the leadership and operations team who keep LETNeu running smoothly.",
    members: administration,
  },
  faculty: {
    title: "Faculty",
    description: "Discover our faculty team driving research, mentorship, and scientific discovery.",
    members: faculty,
  },
  "research-associates": {
    title: "Research Associates & Graduate Trainees",
    description: "Explore the research associates, graduate students, and trainees powering our projects.",
    members: researchAssociatesAndGraduateTrainees,
  },
} as const;

type CategoryKey = keyof typeof categories;

const TeamCategory = () => {
  const { category } = useParams<{ category: string }>();
  const categoryKey = category as CategoryKey;

  if (!category || !categories[categoryKey]) {
    return <Navigate to="/team" replace />;
  }

  const selectedCategory = categories[categoryKey];

  const isBioMember = (member: TeamMember) =>
    [
      ...faculty,
      ...researchAssociatesAndGraduateTrainees,
    ].some((item) => item.id === member.id && Boolean(item.detailedBio));

  return (
    <Layout>
      <div
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.postimg.cc/7Yh4SwmZ/Untitled-design-3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-0"></div>
        <div className="container mx-auto px-4 py-20 relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedCategory.title}
          </motion.h1>
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-white/90">{selectedCategory.description}</p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={selectedCategory.title}
            subtitle={selectedCategory.description}
          />

          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            layout
            transition={{ duration: 0.5, type: "spring" }}
          >
            {selectedCategory.members.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                email={member.email}
                linkedin={member.linkedin}
                facebook={member.facebook}
                twitter={member.twitter}
                instagram={member.instagram}
                websites={member.websites}
                position={member.position}
                detailedBio={member.detailedBio}
                showBio={isBioMember(member)}
                delay={index % 3}
              />
            ))}
          </motion.div>

          {categoryKey === "research-associates" && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Alumni</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {alumni.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/70"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    {member.role && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TeamCategory;
