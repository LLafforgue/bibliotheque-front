import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../kit/Icons";

export default function Modal({ isOpen, onClose, children, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl"
          >
            {/* Bouton fermer */}
            <div className="absolute top-3 right-3">
              <Icon
                type="fermer"
                title="Fermer"
                action={onClose}
                className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full"
              />
            </div>

            {/* Titre si fourni */}
            {title && (
              <h3
                id="modal-title"
                className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
              >
                {title}
              </h3>
            )}

            {/* Contenu */}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
