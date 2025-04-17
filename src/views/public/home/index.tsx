import { JSX } from "react";
import { motion } from "framer-motion";

import Hero from "./hero";
import Feature from "./feature";
import Cta from "./cta";
import Footer from "./footer";

const HomePage = (): JSX.Element => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                ease: "easeInOut",
            }}
        >
            <main>
                <Hero />
                <Feature />
                <Cta />
            </main>
            <Footer />
        </motion.div>
    )
}

export default HomePage;