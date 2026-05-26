"use client";

import { motion, useReducedMotion } from "motion/react";

const colors = ["#940533", "#c0012a", "#f5061d", "#ff8800", "#ffb300"];

const lines = [
  { width: "82%", color: colors[4], delay: 0 },
  { width: "66%", color: colors[3], delay: 0.12 },
  { width: "92%", color: colors[2], delay: 0.24 },
  { width: "58%", color: colors[1], delay: 0.36 },
];

export default function Loading() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Carregando página"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at top, rgba(255, 179, 0, 0.14), transparent 35%), radial-gradient(circle at bottom, rgba(148, 5, 51, 0.35), transparent 45%), #070408",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
        animate={reduceMotion ? false : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "min(430px, calc(100vw - 48px))",
          padding: "32px",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.055)",
          border: "1px solid rgba(255, 179, 0, 0.16)",
          boxShadow:
            "0 24px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "26px",
          }}
        >
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              style={{
                margin: 0,
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#ffb300",
                fontWeight: 800,
              }}
            >
              Carregando
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5 }}
              style={{
                margin: "6px 0 0",
                fontSize: "clamp(1.65rem, 5vw, 2.35rem)",
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-0.055em",
              }}
            >
              Preparando tudo
            </motion.h1>
          </div>

          <motion.div
            animate={reduceMotion ? false : { rotate: 360 }}
            transition={{
              duration: 2.4,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "999px",
              background:
                "conic-gradient(from 90deg, #940533, #c0012a, #f5061d, #ff8800, #ffb300, #940533)",
              padding: "2px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "999px",
                background: "#09050a",
              }}
            />
          </motion.div>
        </div>

        {/* ANIMAÇÃO DE LINHAS */}
        <div
          style={{
            display: "grid",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: index === 2 ? "14px" : "10px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.07)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        clipPath: "inset(0 100% 0 0)",
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        clipPath: [
                          "inset(0 100% 0 0)",
                          "inset(0 0% 0 0)",
                          "inset(0 0% 0 0)",
                          "inset(0 0% 0 100%)",
                        ],
                      }
                }
                transition={{
                  duration: 1.65,
                  delay: line.delay,
                  ease: [0.76, 0, 0.24, 1],
                  repeat: Infinity,
                  repeatDelay: 0.35,
                }}
                style={{
                  width: line.width,
                  height: "100%",
                  borderRadius: "inherit",
                  background: `linear-gradient(90deg, ${line.color}, #ffb300)`,
                  boxShadow: `0 0 24px ${line.color}`,
                }}
              />

              <motion.div
                animate={
                  reduceMotion
                    ? false
                    : {
                        x: ["-120%", "220%"],
                      }
                }
                transition={{
                  duration: 1.35,
                  delay: line.delay + 0.18,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.65,
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "38%",
                  borderRadius: "inherit",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent)",
                  filter: "blur(1px)",
                }}
              />
            </div>
          ))}
        </div>

        {/* BARRA DE CARREGAMENTO */}
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              fontSize: "0.78rem",
              color: "rgba(255, 255, 255, 0.72)",
              fontWeight: 700,
            }}
          >
            <span>Carregando recursos</span>

            <motion.span
              animate={
                reduceMotion
                  ? false
                  : {
                      opacity: [0.45, 1, 0.45],
                    }
              }
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                color: "#ffb300",
              }}
            >
              Aguarde...
            </motion.span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "12px",
              borderRadius: "999px",
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 179, 0, 0.14)",
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { width: "0%" }}
              animate={
                reduceMotion
                  ? false
                  : {
                      width: ["0%", "35%", "68%", "86%", "100%"],
                    }
              }
              transition={{
                duration: 2.4,
                ease: [0.76, 0, 0.24, 1],
                repeat: Infinity,
                repeatDelay: 0.35,
              }}
              style={{
                height: "100%",
                borderRadius: "999px",
                background:
                  "linear-gradient(90deg, #940533, #c0012a, #f5061d, #ff8800, #ffb300)",
                boxShadow:
                  "0 0 18px rgba(245, 6, 29, 0.65), 0 0 32px rgba(255, 179, 0, 0.35)",
              }}
            />

            <motion.div
              animate={
                reduceMotion
                  ? false
                  : {
                      x: ["-120%", "260%"],
                    }
              }
              transition={{
                duration: 1.35,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "34%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                filter: "blur(1px)",
              }}
            />
          </div>
        </div>

        <motion.p
          animate={
            reduceMotion
              ? false
              : {
                  opacity: [0.55, 1, 0.55],
                }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            margin: "18px 0 0",
            color: "rgba(255, 255, 255, 0.62)",
            fontSize: "0.86rem",
            fontWeight: 600,
          }}
        >
          Sincronizando interface...
        </motion.p>
      </motion.section>
    </main>
  );
}