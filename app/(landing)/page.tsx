import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { TextLoop } from "@/components/ui/text-loop";
import PP from "@/public/pp.jpg";
import Sample from "@/public/sample.png";
import {
  ChevronRightIcon,
  GithubIcon,
  Globe,
  Linkedin,
  LinkIcon,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Globe,
    title: "Share Thoughts and media",
    description:
      " Wink allows you to share your moments with your friends and family. You can also upload media such as images or videos to share with your friends.",
  },
  {
    icon: LinkIcon,
    title: "Connect with friends",
    description:
      "Wink connects you with your friends and family. You can chat with them and send messages.",
  },
  {
    icon: Smartphone,
    title: "Real-time communication",
    description:
      "Wink provides real-time communication, so you can chat with your friends and family in real-time.",
    subDescription: "Coming soon",
  },
];

export default function LandingPage() {
  return (
    <main className="container mx-auto max-w-5xl px-2 md:px-4">
      {/* hero */}
      <section className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
        <BlurFade delay={0.3}>
          <Button size="sm" className="rounded-xl" asChild>
            <Link
              href={"https://github.com/yaisrak/wink"}
              target="_blank"
              className="flex items-center"
            >
              <GithubIcon className="mr-2 h-3 w-3" />
              Star In Github
            </Link>
          </Button>
        </BlurFade>
        <BlurFade className="text-3xl font-bold sm:text-5xl md:text-6xl">
          Connect and Share your <br />
          <TextLoop
            variants={{
              initial: {
                y: 20,
                rotateX: 90,
                opacity: 0,
                filter: "blur(4px)",
              },
              animate: {
                y: 0,
                rotateX: 0,
                opacity: 1,
                filter: "blur(0px)",
              },
              exit: {
                y: -20,
                rotateX: -90,
                opacity: 0,
                filter: "blur(4px)",
              },
            }}
          >
            <span>Moment</span>
            <span>Thought</span>
            <span>Memories</span>
          </TextLoop>{" "}
          in <span className="underline">Wink</span>
        </BlurFade>
        <BlurFade
          delay={0.1}
          className="max-w-2xl text-base font-normal sm:text-xl md:max-w-4xl md:text-2xl"
        >
          Wink is a social media platform that allows you to connect with people
          you know and share your moments with them.
        </BlurFade>
        <BlurFade delay={0.2}>
          <RainbowButton className="rounded-xl">
            Get Started
            <ChevronRightIcon className="ml-2 size-5" />
          </RainbowButton>
        </BlurFade>
      </section>

      {/* features */}
      <section className="py-[15vmin]">
        <BlurFade inView>
          <h1 className="mb-4 text-center text-3xl font-bold">Features</h1>
          <div className="grid grid-cols-3 gap-2">
            {features.map((feature, i) => (
              <BlurFade
                inView
                delay={i * 0.1}
                key={feature.title}
                className="rounded-xl border p-4"
              >
                <feature.icon className="mb-2 h-8 w-8" />
                <h1 className="mb-2 text-base font-semibold md:text-lg">
                  {feature.title}
                </h1>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {feature.description}
                </p>

                {feature.subDescription && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    --{feature.subDescription}--
                  </p>
                )}
              </BlurFade>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* image */}
      <section className="px-6 md:px-12">
        <BlurFade inView>
          <Image
            src={Sample}
            width={1000}
            placeholder="blur"
            className="rounded-2xl border-2 shadow-sm"
            height={1000}
            alt="sample photo"
          />
        </BlurFade>
      </section>

      {/* Mobile App */}
      <section className="py-[15vmin] text-center">
        <BlurFade inView>
          <Smartphone className="mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            Mobile App Coming Soon
          </h2>
          <p>Stay tuned for our mobile app. Wink on the go!</p>
        </BlurFade>
      </section>

      {/* Developer */}
      <section className="py-[5vmin]">
        <BlurFade inView className="text-center text-3xl font-bold">
          Meet Developer
        </BlurFade>
        <div className="grid grid-cols-2 items-center">
          <BlurFade
            inView
            delay={0.1}
            className="relative overflow-hidden p-12"
          >
            <Image
              src={PP}
              width={500}
              height={500}
              placeholder="blur"
              alt="yaisrak"
              className="rounded-full"
            />
          </BlurFade>
          <BlurFade inView delay={0.2}>
            <h1 className="text-xl font-bold">MD Yaser Arafat Israk</h1>
            <p className="max-w-xs text-sm text-muted-foreground">
              I am a full-stack developer with a passion for creating
              user-friendly web applications. My expertise lies in React,
            </p>

            <div className="flex items-center text-muted-foreground">
              <Button size="icon" asChild variant="ghost">
                <Link href={"https://yaserisrak.vercel.app"} target="_blank">
                  <Globe className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" asChild variant="ghost">
                <Link href={"https://github.com/yaisrak"} target="_blank">
                  <GithubIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" asChild variant="ghost">
                <Link href={"https://linkedin.com/in/israk"} target="_blank">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
