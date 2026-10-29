import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ContactButton() {
  return (
    <Link to="/contact">
      <Button>
        Contact Us
      </Button>
    </Link>
  );
}