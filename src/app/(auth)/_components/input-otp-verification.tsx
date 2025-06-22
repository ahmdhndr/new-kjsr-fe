import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPVerification() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup className="gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <InputOTPSlot
            key={i}
            index={i}
            autoFocus={i === 0}
            className="h-12 w-12 rounded-lg border text-center text-xl shadow-md"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
