import {
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Check,
  FileStack,
  TrendingUp,
  Building2,
  GraduationCap,
  Award,
  ShieldCheck,
  UserRound,
  AppWindow,
} from "lucide-react";
import { RevealLines } from "@/components/motion/Reveal";
import elearning from '@/assets/images/ourproducts.jpg'
import GoogleCloudMark from "@/components/brand/GoogleCloudMark";
import ZtnaFlow from "@/components/sections/platform-overview/ZtnaFlow";

// Ordered by standing in the industry: hyperscalers and mega-cap platforms first,
// then the frontier AI labs, then public security/data vendors, then the
// subsidiary / privately held infrastructure brands.
const partnerLogos = [
  {
    name: "NVIDIA",
    hex: "#76B900",
    path: "M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z",
  },
  {
    name: "Microsoft",
    rects: [
      { x: 1, y: 1, fill: "#F25022" },
      { x: 12.5, y: 1, fill: "#7FBA00" },
      { x: 1, y: 12.5, fill: "#00A4EF" },
      { x: 12.5, y: 12.5, fill: "#FFB900" },
    ],
  },
  {
    name: "Google Cloud",
    // Shared with the hero partner banner so the gradient mark is defined once.
    Component: GoogleCloudMark,
  },
  {
    name: "AWS",
    viewBox: "0 0 304 182",
    paths: [
      {
        fill: "#252F3E",
        d: "M86.4,66.4c0,3.7,0.4,6.7,1.1,8.9c0.8,2.2,1.8,4.6,3.2,7.2c0.5,0.8,0.7,1.6,0.7,2.3c0,1-0.6,2-1.9,3l-6.3,4.2c-0.9,0.6-1.8,0.9-2.6,0.9c-1,0-2-0.5-3-1.4C76.2,90,75,88.4,74,86.8c-1-1.7-2-3.6-3.1-5.9c-7.8,9.2-17.6,13.8-29.4,13.8c-8.4,0-15.1-2.4-20-7.2c-4.9-4.8-7.4-11.2-7.4-19.2c0-8.5,3-15.4,9.1-20.6c6.1-5.2,14.2-7.8,24.5-7.8c3.4,0,6.9,0.3,10.6,0.8c3.7,0.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16c-3.2-3.1-8.6-4.6-16.3-4.6c-3.5,0-7.1,0.4-10.8,1.3c-3.7,0.9-7.3,2-10.8,3.4c-1.6,0.7-2.8,1.1-3.5,1.3c-0.7,0.2-1.2,0.3-1.6,0.3c-1.4,0-2.1-1-2.1-3.1v-4.9c0-1.6,0.2-2.8,0.7-3.5c0.5-0.7,1.4-1.4,2.8-2.1c3.5-1.8,7.7-3.3,12.6-4.5c4.9-1.3,10.1-1.9,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1c5.5,5.4,8.3,13.6,8.3,24.6V66.4z M45.8,81.6c3.3,0,6.7-0.6,10.3-1.8c3.6-1.2,6.8-3.4,9.5-6.4c1.6-1.9,2.8-4,3.4-6.4c0.6-2.4,1-5.3,1-8.7v-4.2c-2.9-0.7-6-1.3-9.2-1.7c-3.2-0.4-6.3-0.6-9.4-0.6c-6.7,0-11.6,1.3-14.9,4c-3.3,2.7-4.9,6.5-4.9,11.5c0,4.7,1.2,8.2,3.7,10.6C37.7,80.4,41.2,81.6,45.8,81.6z M126.1,92.4c-1.8,0-3-0.3-3.8-1c-0.8-0.6-1.5-2-2.1-3.9L96.7,10.2c-0.6-2-0.9-3.3-0.9-4c0-1.6,0.8-2.5,2.4-2.5h9.8c1.9,0,3.2,0.3,3.9,1c0.8,0.6,1.4,2,2,3.9l16.8,66.2l15.6-66.2c0.5-2,1.1-3.3,1.9-3.9c0.8-0.6,2.2-1,4-1h8c1.9,0,3.2,0.3,4,1c0.8,0.6,1.5,2,1.9,3.9l15.8,67l17.3-67c0.6-2,1.3-3.3,2-3.9c0.8-0.6,2.1-1,3.9-1h9.3c1.6,0,2.5,0.8,2.5,2.5c0,0.5-0.1,1-0.2,1.6c-0.1,0.6-0.3,1.4-0.7,2.5l-24.1,77.3c-0.6,2-1.3,3.3-2.1,3.9c-0.8,0.6-2.1,1-3.8,1h-8.6c-1.9,0-3.2-0.3-4-1c-0.8-0.7-1.5-2-1.9-4L156,23l-15.4,64.4c-0.5,2-1.1,3.3-1.9,4c-0.8,0.7-2.2,1-4,1H126.1z M254.6,95.1c-5.2,0-10.4-0.6-15.4-1.8c-5-1.2-8.9-2.5-11.5-4c-1.6-0.9-2.7-1.9-3.1-2.8c-0.4-0.9-0.6-1.9-0.6-2.8v-5.1c0-2.1,0.8-3.1,2.3-3.1c0.6,0,1.2,0.1,1.8,0.3c0.6,0.2,1.5,0.6,2.5,1c3.4,1.5,7.1,2.7,11,3.5c4,0.8,7.9,1.2,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3c3.4-2.2,5.2-5.4,5.2-9.5c0-2.8-0.9-5.1-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L246,52c-7.3-2.3-12.7-5.7-16-10.2c-3.3-4.4-5-9.3-5-14.5c0-4.2,0.9-7.9,2.7-11.1c1.8-3.2,4.2-6,7.2-8.2c3-2.3,6.4-4,10.4-5.2c4-1.2,8.2-1.7,12.6-1.7c2.2,0,4.5,0.1,6.7,0.4c2.3,0.3,4.4,0.7,6.5,1.1c2,0.5,3.9,1,5.7,1.6c1.8,0.6,3.2,1.2,4.2,1.8c1.4,0.8,2.4,1.6,3,2.5c0.6,0.8,0.9,1.9,0.9,3.3v4.7c0,2.1-0.8,3.2-2.3,3.2c-0.8,0-2.1-0.4-3.8-1.2c-5.7-2.6-12.1-3.9-19.2-3.9c-5.7,0-10.2,0.9-13.3,2.8c-3.1,1.9-4.7,4.8-4.7,8.9c0,2.8,1,5.2,3,7.1c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6c3.1,4.1,4.6,8.8,4.6,14c0,4.3-0.9,8.2-2.6,11.6c-1.8,3.4-4.2,6.4-7.3,8.8c-3.1,2.5-6.8,4.3-11.1,5.6C264.4,94.4,259.7,95.1,254.6,95.1z",
      },
      {
        fill: "#FF9900",
        d: "M273.5,143.7c-32.9,24.3-80.7,37.2-121.8,37.2c-57.6,0-109.5-21.3-148.7-56.7c-3.1-2.8-0.3-6.6,3.4-4.4c42.4,24.6,94.7,39.5,148.8,39.5c36.5,0,76.6-7.6,113.5-23.2C274.2,133.6,278.9,139.7,273.5,143.7z",
      },
      {
        fill: "#FF9900",
        d: "M287.2,128.1c-4.2-5.4-27.8-2.6-38.5-1.3c-3.2,0.4-3.7-2.4-0.8-4.5c18.8-13.2,49.7-9.4,53.3-5c3.6,4.5-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C282.5,155.7,291.4,133.4,287.2,128.1z",
      },
    ],
  },
  {
    name: "Oracle",
    hex: "#F80000",
    path: "M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z",
  },
  {
    name: "Meta",
    hex: "#0467DF",
    path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
  },
  {
    name: "OpenAI",
    hex: "#000000",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
  },
  {
    name: "Claude",
    hex: "#D97757",
    path: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  },
  {
    name: "Palo Alto Networks",
    hex: "#F04E23",
    path: "m10.278 15.443 1.705 1.705-3.426 3.426-3.427-3.426 8.592-8.591-1.705-1.705 3.426-3.426 3.427 3.426-8.592 8.591zM0 12.017l3.426 3.426 8.591-8.59-3.426-3.427L0 12.017zm11.983 5.13 3.426 3.427L24 11.983l-3.426-3.426-8.591 8.59z",
  },
  {
    name: "Snowflake",
    hex: "#29B5E8",
    path: "M24 3.459c0 .646-.418 1.18-1.141 1.18-.723 0-1.142-.534-1.142-1.18 0-.647.419-1.18 1.142-1.18.723 0 1.141.533 1.141 1.18zm-.228 0c0-.533-.38-.951-.913-.951s-.913.38-.913.95c0 .533.38.952.913.952.57 0 .913-.419.913-.951zm-1.37-.533h.495c.266 0 .456.152.456.38 0 .153-.076.229-.19.305l.19.266v.038h-.266l-.19-.266h-.229v.266h-.266zm.495.228h-.229v.267h.229c.114 0 .152-.038.152-.114.038-.077-.038-.153-.152-.153zM7.602 12.4c.038-.151.076-.304.076-.456 0-.114-.038-.228-.038-.342-.114-.343-.304-.647-.646-.838l-4.87-2.777c-.685-.38-1.56-.152-1.94.533-.381.685-.153 1.56.532 1.94l2.701 1.56-2.701 1.56c-.685.38-.913 1.256-.533 1.94.38.685 1.256.914 1.94.533l4.832-2.777c.343-.267.571-.533.647-.876zm1.332 2.626c-.266-.038-.57.038-.837.19l-4.832 2.777c-.685.38-.913 1.256-.532 1.94.38.686 1.255.914 1.94.533l2.701-1.56v3.12c0 .8.647 1.408 1.446 1.408.799 0 1.407-.647 1.407-1.408v-5.592c0-.761-.57-1.37-1.293-1.408zm4.946-6.088c.266.038.57-.038.837-.19l4.832-2.777c.685-.38.913-1.256.532-1.94-.38-.686-1.255-.914-1.94-.533l-2.701 1.56V1.975c0-.799-.647-1.408-1.446-1.408-.799 0-1.446.609-1.446 1.408V7.53c0 .76.609 1.37 1.332 1.407zM3.265 5.97l4.832 2.777c.266.152.533.19.837.19.723-.038 1.331-.684 1.331-1.407V1.975c0-.799-.646-1.408-1.407-1.408-.799 0-1.446.647-1.446 1.408v3.12l-2.701-1.56c-.685-.38-1.56-.152-1.94.533-.419.646-.19 1.521.494 1.902zm9.093 6.011a.412.412 0 00-.114-.266l-.57-.571a.346.346 0 00-.267-.114.412.412 0 00-.266.114l-.571.57a.411.411 0 00-.114.267c0 .076.038.19.114.267l.57.57a.345.345 0 00.267.114c.076 0 .19-.038.266-.114l.571-.57a.412.412 0 00.114-.267zm1.598.533L11.94 14.53c-.039.038-.153.114-.229.114h-.608a.411.411 0 01-.267-.114L8.82 12.514a.408.408 0 01-.076-.229v-.608c0-.076.038-.19.114-.267l2.016-2.016a.41.41 0 01.267-.114h.608a.41.41 0 01.267.114l2.016 2.016a.347.347 0 01.114.267v.608c-.076.077-.114.19-.19.229zm5.593 5.44l-4.832-2.777c-.266-.152-.57-.19-.837-.152-.723.038-1.332.684-1.332 1.408v5.554c0 .8.647 1.408 1.408 1.408.799 0 1.446-.647 1.446-1.408v-3.12l2.7 1.56c.686.38 1.561.152 1.941-.533.419-.646.19-1.521-.494-1.94zm2.549-7.533l-2.701 1.56 2.7 1.56c.686.38.914 1.256.533 1.94-.38.685-1.255.913-1.94.533l-4.832-2.778a1.644 1.644 0 01-.647-.798c-.037-.153-.076-.305-.076-.457 0-.114.039-.228.039-.342.114-.343.342-.647.646-.837l4.832-2.778c.685-.38 1.56-.152 1.94.533.457.609.19 1.484-.494 1.864",
  },
  {
    name: "Zscaler",
    hex: "#0076BE",
    viewBox: "-1 -1 84 54",
    path: "M80.7 26.44C82.02 34.79 75.02 39.5 68.02 40c-3.57 6.62-10.92 12-21.54 12a25 25 0 0 1-12.51-2.84 16 16 0 0 1-2.85.26c-3.71 0-6.24-.86-8.71-3.79 5-6.73 20.22-18.83 38.76-12.58 9.91 3.33 12.49-4.5 10-7.43-9.34-11.07-30.46-1.11-31.21-.27 8.25-13.24 37.91-16.94 40.74 1.09zm-28.42-15.2c.06 0-6.73-2.51-16.23 1.77a11.53 11.53 0 0 1-1.12-.54c9.13-6.31 17.14-9 24-8C54.51.58 49.67 0 42.61 0c-7.83 0-14.77 3.07-19.17 7.82a18.76 18.76 0 0 0-4.15-.44C8.68 7.38-.53 17.39.02 28.76S12.5 47.22 19.29 45.31a1.4 1.4 0 0 1 .5 0c1.5-7.52 7.63-25.01 32.49-34.07z",
  },
  {
    name: "GitHub",
    hex: "#181717",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "Red Hat",
    hex: "#EE0000",
    path: "M16.009 13.386c1.577 0 3.86-.326 3.86-2.202a1.765 1.765 0 0 0-.04-.431l-.94-4.08c-.216-.898-.406-1.305-1.982-2.093-1.223-.625-3.888-1.658-4.676-1.658-.733 0-.947.946-1.822.946-.842 0-1.467-.706-2.255-.706-.757 0-1.25.515-1.63 1.576 0 0-1.06 2.99-1.197 3.424a.81.81 0 0 0-.028.245c0 1.162 4.577 4.974 10.71 4.974m4.101-1.435c.218 1.032.218 1.14.218 1.277 0 1.765-1.984 2.745-4.593 2.745-5.895.004-11.06-3.451-11.06-5.734a2.326 2.326 0 0 1 .19-.925C2.746 9.415 0 9.794 0 12.217c0 3.969 9.405 8.861 16.851 8.861 5.71 0 7.149-2.582 7.149-4.62 0-1.605-1.387-3.425-3.887-4.512",
  },
  {
    name: "VMware",
    hex: "#607078",
    path: "M.5 10.1a.505.505 0 00-.197.048.497.497 0 00-.25.68l1.138 2.475c.179.38.38.592.721.592.342 0 .542-.22.72-.592l1.003-2.186a.144.144 0 01.144-.092.16.16 0 01.157.16v2.118a.535.535 0 101.066 0v-1.73a.531.531 0 01.566-.552.52.52 0 01.541.551v1.73a.531.531 0 00.53.593.539.539 0 00.535-.592v-1.73a.531.531 0 01.564-.552.52.52 0 01.543.551v1.73a.531.531 0 00.528.593.535.535 0 00.535-.592v-1.969a1.234 1.234 0 00-1.283-1.23 1.647 1.647 0 00-1.14.486 1.26 1.26 0 00-1.095-.483 1.807 1.807 0 00-1.074.483 1.287 1.287 0 00-.961-.483 1.177 1.177 0 00-1.158.786l-.729 1.716-.933-2.203.011-.004A.505.505 0 00.5 10.1zm18.43.06a.27.27 0 00-.266.274h.002v3.142a.27.27 0 10.535 0v-1.222c0-1.037.571-1.56 1.27-1.643a.266.266 0 00.238-.274.258.258 0 00-.266-.269 1.465 1.465 0 00-1.242.88v-.614a.266.266 0 00-.271-.274zm-6.735.008a.273.273 0 00-.25.217l-.912 2.627-.902-2.62a.28.28 0 00-.274-.22.266.266 0 00-.27.258.493.493 0 00.034.144l1.09 3.037.02-.007a.319.319 0 00.298.242.3.3 0 00.293-.242l.903-2.583.896 2.583a.3.3 0 00.293.242h.018a.319.319 0 00.293-.242l1.097-3.038a.512.512 0 00.033-.144.258.258 0 00-.265-.25.262.262 0 00-.258.209l-.918 2.63-.904-2.626a.285.285 0 00-.278-.217h-.025a.273.273 0 00-.012 0zm10.168.008a1.75 1.75 0 00-1.691 1.851 1.765 1.765 0 001.76 1.858l-.008.013a1.784 1.784 0 001.33-.539.228.228 0 00.082-.17.228.228 0 00-.379-.168 1.435 1.435 0 01-1.018.415 1.237 1.237 0 01-1.24-1.207h2.555a.247.247 0 00.246-.247c0-.945-.593-1.806-1.637-1.806zm-5.744.002a1.571 1.571 0 00-.158.006 2.384 2.384 0 00-1.078.205.22.22 0 00-.143.222.24.24 0 00.235.229.266.266 0 00.095-.024 1.822 1.822 0 01.834-.162c.691 0 1.07.334 1.07.979v.125a3.796 3.796 0 00-1.103-.15c-.892 0-1.52.4-1.52 1.16l-.003-.004c0 .736.671 1.117 1.34 1.117a1.575 1.575 0 001.298-.62v.343a.247.247 0 00.254.25.254.254 0 00.258-.262v-1.983a1.416 1.416 0 00-.379-1.046 1.571 1.571 0 00-1-.385zm5.719.43c.714 0 1.085.565 1.139 1.214h-2.278a1.222 1.222 0 011.139-1.215zm-5.885 1.382a3.75 3.75 0 011.057.153V12.49c0 .57-.539.973-1.2.973-.485 0-.904-.261-.904-.713 0-.467.375-.76 1.047-.76Z",
  },
  {
    name: "Veeam",
    hex: "#00B336",
    path: "M6.63 9.842c-1.104 0-2 .945-2 2.101v.108c0 1.322.846 2.038 1.974 2.1.051.007.108.007.16.007.435 0 .794-.115 1.195-.361.04-.023.201-.132.361-.338.132-.166.138-.411 0-.543-.2-.189-.412-.086-.595.074-.292.246-.516.442-1.1.442-.55 0-1.064-.316-1.19-.94 0-.023.01-.045.034-.045H8.16a.473.473 0 0 0 .47-.504c0-1.156-.894-2.1-1.999-2.1zm4.466 0c-1.1 0-1.996.945-1.996 2.101v.108c0 1.322.846 2.038 1.974 2.1.052.007.11.007.16.007.435 0 .795-.115 1.196-.361.04-.023.2-.132.361-.338.132-.166.137-.411 0-.543-.2-.189-.413-.086-.596.074-.292.246-.515.442-1.1.442-.549 0-1.063-.316-1.189-.94-.006-.023.01-.045.028-.045h2.691a.473.473 0 0 0 .47-.504c-.007-1.156-.9-2.1-1.999-2.1zm-6.89.04a.4.4 0 0 0-.344.223l-1.42 3.063c-.034.063-.062.11-.136.11-.075 0-.105-.047-.14-.11l-1.42-3.057a.38.38 0 0 0-.53-.177.428.428 0 0 0-.172.56l1.39 2.828.16.32a.8.8 0 0 0 .712.46.791.791 0 0 0 .709-.46l.16-.32 1.385-2.834a.423.423 0 0 0-.166-.56.376.376 0 0 0-.188-.045zm11.362 0a.762.762 0 0 0-.504.188.808.808 0 0 0-.207.27l-1.59 3.137c0 .005-.007.006-.007.01v.007a.434.434 0 0 0 .03.442c0 .005.005.006.005.01 0 .007.006.005.006.01a.372.372 0 0 0 .516.077s.005 0 .005-.006a.083.083 0 0 0 .024-.017l.015-.018.006-.006a.485.485 0 0 0 .076-.103l.057-.125.332-.7c.006-.017.028-.027.045-.027h1.484c.195 0 .354-.167.354-.379 0-.206-.159-.377-.354-.377h-1.099a.033.033 0 0 1-.03-.046l.08-.172.602-1.207v-.006s0-.006.006-.006c.011-.023.04-.108.098-.125.034-.012.063-.012.086 0 .063.017.084.091.113.148l1.455 3.022a.393.393 0 0 0 .48.195s.006 0 .006-.006l.035-.017c.006 0 .007-.006.012-.006 0 0 .006 0 .006-.006.006 0 .006-.006.012-.006s.01-.004.01-.01c.006 0 .006-.006.011-.006.006-.006.012-.012.018-.012l.017-.017.006-.006a.408.408 0 0 0 .092-.498l-1.598-3.154a.79.79 0 0 0-.709-.45zm3.508 0c-.39 0-.709.332-.709.778v3.018c0 .183.104.354.264.406.263.086.486-.143.486-.412l-.058-2.938a.03.03 0 0 1 .052-.017l1.442 2.93c.137.28.367.449.625.449.257 0 .49-.167.623-.448l1.449-2.935c.01-.029.05-.019.05.016l-.056 2.955c0 .234.177.423.389.412.206-.006.367-.207.367-.43V10.66c.01-.452-.31-.77-.7-.777a.684.684 0 0 0-.61.394c-.361.739-1.426 2.93-1.426 2.936-.006.01-.03.064-.075.064-.04 0-.068-.047-.074-.064-.35-.727-1.047-2.164-1.408-2.908-.143-.287-.38-.422-.63-.422zm-12.45.647c.697 0 1.14.527 1.208 1.145 0 .023-.012.045-.035.045H5.47c-.023-.006-.033-.022-.033-.045.074-.607.49-1.145 1.19-1.145zm4.47 0h.002c.697.001 1.138.527 1.207 1.145 0 .023-.013.045-.035.045H9.94c-.023-.006-.04-.022-.034-.045.075-.606.493-1.144 1.19-1.145z",
  },
];

const products = [
  {
  key: "Enterprise Labs",
  layout: "stat",
  name: "Enterprise Labs",
  icon: TrendingUp,
  accent: "blue",
  badge: "Hands-on learning environments",
  title: "Hands-On Cloud Labs for Enterprise Learning",
  shortText: "Build practical cloud skills in real environments",
  description:
    "Deliver hands-on cloud learning at scale with ready-to-use labs, real-world environments, and automated infrastructure.",
},
  {
  key: "elearning",
  layout: "features",
  name: "E-Learning & LMS",
  icon: FileStack,
  accent: "purple",
  features: [
    { label: "Centralized course catalog", sub: "All learning content in one place" },
    { label: "Certifications & compliance", sub: "Auto-issued on completion" },
  ],
  title: "Enterprise Learning Management System",

  shortText:
    "One platform to manage learning, learners, and training at scale.",

  description:
    "Deliver, manage, and track enterprise learning through a centralized LMS built for modern organizations.",
},
  {
  key: "reyvanx",
  layout: "ztna",
  name: "ReyvanX",
  icon: ShieldCheck,
  accent: "teal",

  // The three points every ZTNA request passes through. Order matters: the
  // broker sits between the user and the app, which is the whole distinction
  // from a VPN dropping someone onto the network.
  flow: [
    { label: "Verified user", icon: UserRound },
    { label: "ReyvanX broker", icon: ShieldCheck, primary: true },
    { label: "Private app", icon: AppWindow },
  ],

  tags: ["Identity-aware access", "No inbound ports", "Least privilege"],

  // One per beat of the animation. Two lines max — it reads in ~3s.
   steps: [
     { title: "Identity and device verified" },
     { title: "Policy evaluated", note: "— app stays dark" },
     { title: "Connected", note: "— to this one app" },
  ],

  title: "Zero Trust Network Access with ReyvanX",
  shortText:
    "Replace VPN with identity-aware access to private applications.",

  description:
    "ReyvanX help you verify every connection by identity, device, and policy—while keeping applications invisible to the network.",
},
  {
  key: "training",
  layout: "training",
  name: "Training & Certifications",
  icon: TrendingUp,
  accent: "dark",

  features: [
    {
      label: "Corporate Training",
      sub: "Upskill teams with role-based cloud & AI programs",
      icon: Building2,
    },
    {
      label: "Individual Training",
      sub: "Build practical skills through self-paced learning",
      icon: GraduationCap,
    },
    {
      label: "Certifications",
      sub: "Validate skills with industry-aligned certifications",
      icon: Award,
    },
  ],

  title: "Training Programs Built for Every Learner",
  shortText:
    "From enterprise teams to individual learners, build skills that matter.",

  description:
    "Build real-world cloud and AI capabilities through expert-led learning and certification.",
},
];

const cardStyles = {
  blue: "bg-gradient-to-br from-[#4B6FF6] to-[#16418e]",
  purple: "bg-gradient-to-br from-[#7A42D9] to-[#150b2e]",
  teal: "bg-gradient-to-br from-[green] to-[#0da335]",
  dark: "bg-gradient-to-br from-[blue] to-[midnightblue]",
};

function PartnerLogo({ brand, size = "sm" }) {
  const boxClass =
    size === "xl" ? "h-12 w-12" : size === "lg" ? "h-10 w-10" : size === "md" ? "h-8 w-8" : "h-5 w-5";
  const iconClass =
    size === "xl" ? "h-11 w-11" : size === "lg" ? "h-9 w-9" : size === "md" ? "h-6 w-6" : "h-4 w-4";
  return (
    <span title={brand.name} className={`inline-flex items-center justify-center ${boxClass}`}>
      {brand.Component ? (
        <brand.Component className={iconClass} />
      ) : brand.rects ? (
        <svg viewBox="0 0 24 24" className={iconClass}>
          {brand.rects.map((r) => (
            <rect key={r.fill} x={r.x} y={r.y} width="10.5" height="10.5" fill={r.fill} />
          ))}
        </svg>
      ) : brand.paths ? (
        <svg viewBox={brand.viewBox || "0 0 24 24"} className={iconClass}>
          {brand.paths.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill} />
          ))}
        </svg>
      ) : (
        <svg viewBox={brand.viewBox || "0 0 24 24"} fill={brand.hex} className={iconClass}>
          <path d={brand.path} />
        </svg>
      )}
    </span>
  );
}

function FeatureRow({ label, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-slate-900">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#1CCF72]" />
      <div>
        <p className="font-medium leading-tight">{label}</p>
        <p className="text-xs leading-tight text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

function ProductWidget({ product }) {
  if (product.layout === "stat") {
    return (
      <div className="w-full rounded-[18px] bg-white/95 p-5 text-slate-900">
        <p className="text-[12px] font-medium opacity-70">{product.badge}</p>

        <div className="mt-4 flex flex-col gap-4 border-t border-slate-100 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Partnered with
          </span>
          {/* 15 marks laid out as three rows of five — the wider 7-up grid left
              the last row short and the logos too small to read. */}
          <div className="grid grid-cols-5 items-center justify-items-center gap-x-3 gap-y-5">
            {partnerLogos.map((brand) => (
              <PartnerLogo key={brand.name} brand={brand} size="lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (product.key === "elearning") {
    return (
      <div className="flex w-full flex-col gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
          {product.name}
        </span>

        <div className="flex items-center gap-4 sm:gap-5">
          <img
            src={elearning}
            alt="Enterprise LMS dashboard preview"
            className="h-28 w-28 shrink-0 rounded-2xl object-cover shadow-lg shadow-black/25 ring-1 ring-white/10 sm:h-44 sm:w-44"
          />

          <div className="flex flex-1 flex-col gap-4">
            {(product.features || []).map((feature) => (
              <div key={feature.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight text-white">
                    {feature.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-tight text-white/65">
                    {feature.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (product.layout === "ztna") {
    return (
      <ZtnaFlow product={product} />
      // <div className="flex w-full flex-col gap-4">
      //   <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
      //     {product.name}
      //   </span>

      //   {/* Drawn as a path rather than listed as bullets: the point of ZTNA is
      //       that nothing reaches the application directly, and that only reads
      //       if the broker is shown sitting between the user and the app. */}
      //   <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      //     <div className="flex items-center justify-between">
      //       {(product.flow || []).map((node, i) => {
      //         const Icon = node.icon;
      //         return (
      //           <Fragment key={node.label}>
      //             {i > 0 && (
      //               <span className="mx-1 h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
      //             )}
      //             <div className="flex w-[84px] flex-col items-center gap-2">
      //               <span
      //                 className={`flex h-10 w-10 items-center justify-center rounded-xl ${
      //                   node.primary
      //                     ? "bg-slate-900/10 ring-1 ring-slate-900/25"
      //                     : "bg-slate-100 ring-1 ring-slate-200"
      //                 }`}
      //               >
      //                 <Icon className="h-4 w-4 text-slate-900" strokeWidth={2} />
      //               </span>
      //               <span className="text-center text-[10px] leading-tight text-slate-700">
      //                 {node.label}
      //               </span>
      //             </div>
      //           </Fragment>
      //         );
      //       })}
      //     </div>
      //   </div>

      //   <div className="flex flex-wrap gap-2">
      //     {(product.tags || []).map((tag) => (
      //       <span
      //         key={tag}
      //         className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] leading-tight text-white/75"
      //       >
      //         {tag}
      //       </span>
      //     ))}
      //   </div>
      // </div>
    );
  }

  if (product.key === "training") {
    return (
      <div className="flex w-full flex-col gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
          {product.name}
        </span>

        <div className="flex flex-col gap-2.5">
          {(product.features || []).map((feature, i) => {
            const Icon = feature.icon || Award;
            return (
              <div
                key={feature.label}
                className="group relative flex items-center gap-3.5 rounded-2xl border border-black/5 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#D4AF6A]/50 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF6A]/35 to-[#D4AF6A]/10 ring-1 ring-[#D4AF6A]/40 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-4 w-4 text-slate-900" strokeWidth={2} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight text-slate-900">
                    {feature.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-tight text-slate-500">
                    {feature.sub}
                  </p>
                </div>

                <span className="shrink-0 text-[10px] font-medium tracking-wide text-slate-300">
                  0{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {(product.features || []).map((feature) => (
        <FeatureRow key={feature.label} {...feature} />
      ))}
    </div>
  );
}

function ProductHeading({ product }) {
  const Icon = product.icon;
  return (
    <>
      <div className="mb-4 flex items-center gap-3 text-xl font-bold">
        <Icon className="h-6 w-6" strokeWidth={2.25} />
        <span>{product.name}</span>
      </div>

      <h3 className="text-2xl font-bold tracking-[-0.04em] text-white sm:text-[2rem]">
        {product.title}
      </h3>

      {product.shortText && (
        <p className="mt-4 text-base font-semibold text-white/90">
          {product.shortText}
        </p>
      )}

      {product.description && (
        <p className="mt-4 text-base leading-7 text-white/85">
          {product.description}
        </p>
      )}
    </>
  );
}

/* The pinned horizontal row only works where a card and its copy fit side by
   side — each group is ~870px wide. Below lg the section is a plain stack. */
const DESKTOP = "(min-width: 1024px)";
const subscribeDesktop = (cb) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getDesktop = () => window.matchMedia(DESKTOP).matches;

function StackedProducts() {
  return (
    <section className="bg-[#070B14] px-5 py-16 text-white sm:px-8 sm:py-20">
      <RevealLines
        as="h2"
        lines={["Our Products"]}
        className="text-center font-recoleta text-2xl font-bold uppercase tracking-wide sm:text-4xl"
      />

      <div className="mx-auto mt-10 flex max-w-xl flex-col gap-14 sm:mt-12">
        {products.map((product) => (
          <article key={product.key}>
            <div
              className={`flex items-center overflow-hidden rounded-[24px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-5 ${cardStyles[product.accent]}`}
            >
              <ProductWidget product={product} />
            </div>

            <div className="mt-6">
              <ProductHeading product={product} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ProductsSection() {
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktop, () => true);
  return isDesktop ? <PinnedProducts /> : <StackedProducts />;
}

function PinnedProducts() {
  const sectionRef = useRef(null);
  const rowRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  /* Measured before paint rather than after.
   *
   * The section's height is derived from this number, so measuring in an
   * ordinary effect lays the page out twice: once at a bare 100vh, then again
   * at its real height once the number lands. Everything below the section
   * moves between those two frames, and the browser's scroll anchoring reacts
   * to it — which is felt as a lurch on the way in, before the row has moved
   * at all. useLayoutEffect puts the real height in the first paint. */
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const measure = () => {
      const first = row.firstElementChild;
      const last = row.lastElementChild;
      if (!first || !last) return;

      /* Width of the content itself, taken from the outer edges of the first
         and last groups rather than from scrollWidth. Both rects carry the
         row's own translate, so their difference is the same at every scroll
         position; scrollWidth is not, and browsers also disagree about whether
         the trailing padding is part of it — which left the last card ending
         flush against the window instead of on the gutter the first one
         started from. */
      const content =
        last.getBoundingClientRect().right - first.getBoundingClientRect().left;

      const cs = getComputedStyle(row);
      const padding = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);

      // clientWidth includes the padding, so this is exactly how far the row
      // has to travel for the last card to sit inset from the right edge by
      // the same gutter the first one started with.
      setScrollDistance(Math.max(0, content + padding - row.clientWidth));
    };

    measure();

    // The row's width tracks the viewport, so this covers window resizes too.
    const observer = new ResizeObserver(measure);
    observer.observe(row);

    /* The card widths are fixed, but the type inside the headings beside them
       is not laid out in its real face until the webfonts land. Re-measure
       when they do, or a cold visit keeps a travel distance measured against
       the fallback. */
    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && measure()).catch(() => {});

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* The row is driven by a spring rather than by the scroll position directly.
   *
   * This is the actual reason the section felt rough. useScroll updates on
   * scroll events, and a scroll event is not one pixel: a wheel notch on
   * Windows arrives as a single ~100px jump, and this section maps scroll
   * pixels to travel pixels 1:1 — so the cards teleported ~100px per notch
   * with nothing drawn in between. No frames were being dropped; there simply
   * were no intermediate positions to draw. The spring generates them.
   *
   * Slightly overdamped, so it never overshoots and rubber-bands: with
   * m = 0.22 and k = 320 critical damping is 2*sqrt(k*m) = 16.8, so 22 puts
   * the ratio at 1.31. The slow root is then 17.7 rad/s — a time constant of
   * ~57ms, under four frames, which is enough to fill in a wheel notch and
   * short enough that the row still reads as attached to the scroll rather
   * than trailing it. */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 22,
    mass: 0.22,
    restDelta: 0.0002,
  });

  // A spring is motion the user didn't ask for, so under reduced motion the
  // row tracks the scroll position exactly. The section still works — the
  // movement is scroll-driven either way, just stepped instead of smoothed.
  const x = useTransform(
    prefersReducedMotion ? scrollYProgress : smoothProgress,
    [0, 1],
    [0, -scrollDistance],
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070B14] text-white"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16">
        <div className="mx-auto mb-12 w-full max-w-7xl px-6 text-center sm:px-8 lg:px-12">
          {/* <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C7B8FF]">
            Our Products
          </p> */}
          {/* Two words on one line, so it takes the masked-line treatment
              rather than a fade-up: the type slides out from behind its own
              baseline at full opacity. Worth doing here and not on the longer
              headings further down the page, because it only reads as
              deliberate on a line whose break is known — see RevealLines. */}
          <RevealLines
            as="h2"
            lines={["Our Products"]}
            className="mt-5 text-2xl font-bold tracking-[-0.06em] sm:text-5xl lg:text-[3rem] font-recoleta uppercase tracking-wide"
          />
        </div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex flex-nowrap items-start gap-16 px-6 will-change-transform sm:px-8 lg:px-12"
        >
          {products.map((product) => (
            <div key={product.key} className="flex shrink-0 items-start gap-12">
              <div
                className={`flex h-[300px] w-[440px] shrink-0 items-center overflow-hidden rounded-[28px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:h-[340px] sm:w-[480px] ${cardStyles[product.accent]}`}
              >
                <ProductWidget product={product} />
              </div>

              <div className="w-[340px] shrink-0 pt-8 sm:w-[380px]">
                <ProductHeading product={product} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
