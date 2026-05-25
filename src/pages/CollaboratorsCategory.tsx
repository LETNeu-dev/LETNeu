import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { collaborators } from "@/data/collaboratorsData";

const CollaboratorsCategory = () => {
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
            Our Collaborators
          </motion.h1>
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-white/90">
              Meet the distinguished researchers and institutions collaborating with LETNeu on groundbreaking neuroscience research.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Key Collaborators"
            subtitle="A global network of leading researchers and institutions advancing neuroscience."
          />

          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            layout
            transition={{ duration: 0.5, type: "spring" }}
          >
            {collaborators.map((collaborator, index) => (
              <motion.div
                key={collaborator.id}
                className="group rounded-3xl overflow-hidden border border-border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md transition hover:-translate-y-1 hover:shadow-xl flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index % 3 * 0.1 }}
              >
                <div className="w-full aspect-[4/4] overflow-hidden bg-slate-100">
                  <img
                    src={collaborator.imageUrl}
                    alt={collaborator.name}
                    className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">{collaborator.name}</h3>
                  <p className="text-sm text-foreground/70 mb-2">{collaborator.institution}</p>
                  <p className="text-xs text-foreground/60 mb-4">{collaborator.country}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CollaboratorsCategory;
