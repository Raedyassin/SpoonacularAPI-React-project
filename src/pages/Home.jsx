import HomeRepate from "../components/HomeRepate";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{duration:0.5}}
    >
      <HomeRepate title="Popular Picks" page={4} food=''/>
      <HomeRepate title="Our Vegetarian Picks" page={3} food='vegetarian'/>
      <HomeRepate title="Our carnivore(meat-eater)  Picks" page={3} food='meat'  style={{marginBottom:"5rem"}}/>
    </motion.div>
  )
}
