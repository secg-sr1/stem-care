// import * as React from "react";
// import {
//   Box,
//   Button,
//   Fab,
//   Tooltip,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import QuestionAnswerRounded from "@mui/icons-material/QuestionAnswerRounded";
// import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
// import { ArrowOutwardOutlined } from "@mui/icons-material";

// import { Link as RouterLink } from "react-router-dom";

// /**
//  * Floating CTA
//  * Props:
//  *  - to | href: internal route or external url
//  *  - label: button text
//  *  - icon: left icon
//  *  - align: "right" | "left" | "center"  (default "right")
//  *  - bottom: number  distance from bottom on sm+ (default 24). xs uses 16.
//  */
// export default function FloatingCta({
//   to = "/contacto",
//   href,
//   label = "Comunícate",
//   icon = <QuestionAnswerRounded />,
//   align = "right",
//   bottom = 24,
// }) {
//   const theme = useTheme();
//   const isXs = useMediaQuery(theme.breakpoints.down("sm"));

//   const linkProps = href
//     ? { component: "a", href, target: "_blank", rel: "noopener noreferrer" }
//     : { component: RouterLink, to };

// //   const anchorSx = {
// //     position: "fixed",
// //     bottom: { xs: 16, sm: bottom },
// //     zIndex: (t) => t.zIndex.snackbar + 10,
// //     ...(align === "right" && { right: { xs: 16, sm: 24 } }),
// //     ...(align === "left" && { left: { xs: 16, sm: 24 } }),
// //     ...(align === "center" && { left: "50%", transform: "translateX(-50%)" }),
// //   };

// // FloatingCta.jsx (only the anchorSx for align="center" changes)
// const anchorSx =
//   align === "center"
//     ? {
//         position: "fixed",
//         left: 0,
//         right: 0,
//         bottom: { xs: 16, sm: bottom },
//         zIndex: (t) => t.zIndex.snackbar + 10,
//         display: "flex",
//         justifyContent: "center",
//         // prevent overlay from blocking clicks outside the button
//         pointerEvents: "none",
//       }
//     : {
//         position: "fixed",
//         bottom: { xs: 16, sm: bottom },
//         ...(align === "right"
//           ? { right: { xs: 16, sm: 24 } }
//           : { left: { xs: 16, sm: 24 } }),
//         zIndex: (t) => t.zIndex.snackbar + 10,
//       };


//   return (
//     <Box sx={anchorSx}>
//       {isXs ? (
//         <Tooltip title={label} arrow>
//           <Fab color="primary" aria-label={label} {...linkProps}
//                sx={{ boxShadow: "0 10px 24px rgba(0,0,0,.35)" }}>
//             {icon}
//           </Fab>
//         </Tooltip>
//       ) : (
//         <Button
//           {...linkProps}
//           startIcon={icon}
//           endIcon={<ArrowOutwardOutlined  />}
//           aria-label={label}
//           sx={{
//             pointerEvents: "auto",
//             px: 2.25,
//             py: 1.1,
//             borderRadius: 999,
//             fontWeight: 500,
//             textTransform: "none",
//             color: "#fff",
//             bgcolor: "rgba(17,24,39,0.72)",
//             border: "1px solid rgba(255,255,255,0.12)",
//             boxShadow: "0 14px 36px rgba(0,0,0,.45)",
//             backdropFilter: "saturate(180%) blur(14px)",
//             "&:hover": { bgcolor: "rgba(17,24,39,0.86)" },
//           }}
//         >
//           {label}
//         </Button>
//       )}
//     </Box>
//   );
// }



// src/components/FloatingCta.jsx
import * as React from "react";
import {
  Box,
  Button,
  Fab,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import QuestionAnswerRounded from "@mui/icons-material/QuestionAnswerRounded";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink } from "react-router-dom";

/**
 * Floating CTA
 *  - to | href: internal route or external url
 *  - label: button text
 *  - icon: left icon
 *  - align: "right" | "left" | "center" (default "right")
 *  - bottom: number (distance from bottom on sm+, default 24)
 */
export default function FloatingCta({
  to = "/contacto",
  href,
  label = "Comunícate",
  icon = <QuestionAnswerRounded  />,
  align = "right",
  bottom = 24,
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const linkProps = href
    ? { component: "a", href, target: "_blank", rel: "noopener noreferrer" }
    : { component: RouterLink, to };

  // Fixed anchor; center uses a full-width row.
  const base = {
    position: "fixed",
    bottom: { xs: 16, sm: bottom },
    zIndex: (t) => t.zIndex.snackbar + 10,
    pointerEvents: "none",               // ⬅️ container ignores taps
  };

  const anchorSx =
    align === "center"
      ? { ...base, left: 0, right: 0, display: "flex", justifyContent: "center" }
      : {
          ...base,
          ...(align === "right"
            ? { right: { xs: 16, sm: 24 } }
            : { left: { xs: 16, sm: 24 } }),
        };

  return (
    <Box sx={anchorSx}>
      {isXs ? (
        <Tooltip title={label} arrow>
          <Fab
            color="primary"
            aria-label={label}
            {...linkProps}
            sx={{
              pointerEvents: "auto",       // ⬅️ the FAB itself is clickable
              boxShadow: "0 10px 24px rgba(0,0,0,.35)",
              backgroundColor:"rgba(17,24,39,0.72)"
            }}
          >
            {icon}
          </Fab>
        </Tooltip>
      ) : (
        <Button
          {...linkProps}
          startIcon={icon}
          endIcon={<ArrowOutwardRounded />}
          aria-label={label}
          sx={{
            pointerEvents: "auto",         // ⬅️ clickable
            px: 2.25,
            py: 1.1,
            borderRadius: 999,
            fontWeight: 300,
            textTransform: "none",
            color: "#fff",
            bgcolor: "rgba(17,24,39,0.72)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 14px 36px rgba(0,0,0,.45)",
            backdropFilter: "saturate(180%) blur(14px)",
            "&:hover": { bgcolor: "rgba(17,24,39,0.86)" },
          }}
        >
          {label}
        </Button>
      )}
    </Box>
  );
}
