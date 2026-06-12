"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const VARIANTS = {
  info: {
    color: "#ffcf40",
    icon: "bi-info-circle-fill",
    iconBackground: "rgba(255,179,0,.13)",
    border: "rgba(255,207,64,.28)",
  },
  success: {
    color: "#5cff95",
    icon: "bi-check-circle-fill",
    iconBackground: "rgba(32,130,75,.16)",
    border: "rgba(92,255,149,.28)",
  },
  warning: {
    color: "#ffcf40",
    icon: "bi-exclamation-triangle-fill",
    iconBackground: "rgba(255,179,0,.13)",
    border: "rgba(255,207,64,.28)",
  },
  danger: {
    color: "#ff758f",
    icon: "bi-x-circle-fill",
    iconBackground: "rgba(245,6,29,.14)",
    border: "rgba(255,117,143,.28)",
  },
  empty: {
    color: "#ffcf40",
    icon: "bi-inbox",
    iconBackground: "rgba(255,179,0,.11)",
    border: "rgba(255,179,0,.20)",
  },
  neutral: {
    color: "rgba(255,255,255,.76)",
    icon: "bi-chat-square-text-fill",
    iconBackground: "rgba(255,255,255,.07)",
    border: "rgba(255,255,255,.12)",
  },
};

const TOAST_VARIANTS = new Set(["danger", "success", "warning"]);
const TOAST_TRANSITION_MS = 220;
const TOAST_Z_INDEX = 100100;

function getIcon(icon, fallbackIcon) {
  if (icon && typeof icon !== "string") {
    return icon;
  }

  const iconName = icon || fallbackIcon;
  const iconClassName = iconName.startsWith("bi ") ? iconName : `bi ${iconName}`;

  return <i className={iconClassName} aria-hidden="true" />;
}

export default function AlertCard({
  variant = "info",
  title,
  message,
  children,
  icon,
  className = "",
  style,
  actions,
  centered = false,
  role,
  ariaLive,
  toast,
  duration = 3200,
  dismissible,
  onClose,
}) {
  const normalizedVariant = variant === "error" ? "danger" : variant;
  const visual = VARIANTS[normalizedVariant] || VARIANTS.neutral;
  const isToast =
    toast ?? (!centered && TOAST_VARIANTS.has(normalizedVariant));
  const canDismiss = dismissible ?? isToast;
  const semanticRole =
    role || (["danger", "success", "warning"].includes(normalizedVariant) ? "alert" : "status");
  const liveMode =
    ariaLive ||
    (semanticRole === "alert" ? "assertive" : semanticRole === "status" ? "polite" : undefined);
  const [portalReady, setPortalReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(!isToast);
  const autoCloseTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const closeAlert = useCallback(() => {
    clearTimeout(autoCloseTimerRef.current);

    if (!isToast) {
      onCloseRef.current?.();
      return;
    }

    setEntered(false);
    clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setVisible(false);
      onCloseRef.current?.();
    }, TOAST_TRANSITION_MS);
  }, [isToast]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    clearTimeout(autoCloseTimerRef.current);
    clearTimeout(transitionTimerRef.current);

    setVisible(true);

    if (!isToast) {
      setEntered(true);
      return undefined;
    }

    setEntered(false);
    const enterTimer = setTimeout(() => {
      setEntered(true);
    }, 20);

    if (duration > 0) {
      autoCloseTimerRef.current = setTimeout(closeAlert, duration);
    }

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoCloseTimerRef.current);
      clearTimeout(transitionTimerRef.current);
    };
  }, [closeAlert, duration, isToast, message, normalizedVariant, title]);

  if (!visible) {
    return null;
  }

  const alertContent = (
    <div
      className={className}
      role={semanticRole}
      aria-live={liveMode}
      aria-atomic="true"
      style={{
        width: isToast ? "calc(100% - 32px)" : "100%",
        color: "#ffffff",
        background:
          "linear-gradient(145deg, rgba(17,17,17,.97), rgba(25,18,22,.97))",
        border: `1px solid ${visual.border}`,
        borderRadius: "22px",
        padding: centered ? "28px 24px" : "16px",
        boxShadow: isToast
          ? "0 22px 60px rgba(0,0,0,.42)"
          : "0 18px 50px rgba(0,0,0,.22)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        ...(isToast
          ? {
              position: "fixed",
              top: "92px",
              right: "clamp(16px, 2vw, 24px)",
              maxWidth: "380px",
              zIndex: TOAST_Z_INDEX,
              opacity: entered ? 1 : 0,
              transform: entered
                ? "translate3d(0, 0, 0)"
                : "translate3d(28px, 0, 0)",
              transition: `opacity ${TOAST_TRANSITION_MS}ms ease, transform ${TOAST_TRANSITION_MS}ms ease`,
              pointerEvents: entered ? "auto" : "none",
            }
          : null),
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: centered ? "column" : "row",
          alignItems: centered ? "center" : "flex-start",
          justifyContent: centered ? "center" : "flex-start",
          gap: centered ? "14px" : "12px",
          minWidth: 0,
          textAlign: centered ? "center" : "left",
        }}
      >
        <div
          style={{
            width: centered ? "56px" : "44px",
            height: centered ? "56px" : "44px",
            borderRadius: centered ? "18px" : "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: visual.color,
            background: visual.iconBackground,
            fontSize: centered ? "1.55rem" : "1rem",
          }}
        >
          {getIcon(icon, visual.icon)}
        </div>

        <div style={{ minWidth: 0, flex: "1 1 auto" }}>
          {title && (
            <strong
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: centered ? "1.08rem" : ".98rem",
                lineHeight: 1.35,
                marginBottom: message || children ? "5px" : 0,
              }}
            >
              {title}
            </strong>
          )}

          {message && (
            <div
              style={{
                color: "rgba(255,255,255,.70)",
                fontSize: ".9rem",
                lineHeight: 1.5,
              }}
            >
              {message}
            </div>
          )}

          {children && (
            <div
              style={{
                color: "rgba(255,255,255,.70)",
                fontSize: ".9rem",
                lineHeight: 1.5,
              }}
            >
              {children}
            </div>
          )}
        </div>

        {(actions || canDismiss) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: centered ? "center" : "flex-end",
              gap: "8px",
              flexShrink: 0,
              marginTop: centered ? "2px" : 0,
            }}
          >
            {actions}
            {canDismiss && (
              <button
                type="button"
                onClick={closeAlert}
                aria-label="Fechar aviso"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  padding: 0,
                  color: "rgba(255,255,255,.62)",
                  background: "transparent",
                  border: 0,
                  borderRadius: "10px",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return isToast
    ? portalReady
      ? createPortal(alertContent, document.body)
      : null
    : alertContent;
}
