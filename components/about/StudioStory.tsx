import Image from "next/image";

export function StudioStory() {
  return (
    <section className="section-py">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-card overflow-hidden order-2 lg:order-1">
            {/*
              {IMAGE: Studio lifestyle or behind-the-scenes photo — warm, personal, shows the sisters at work.
              If unavailable, use a portfolio image with a warm mood. 800x1000px.}
            */}
            <Image
              src="/portfolio/family-portrait-golden-backdrop.jpg"
              alt="Sisters are Sassy Studio — behind the scenes in Tacloban City, Leyte"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-4">
              Our story
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6 leading-tight">
              Two sisters. One studio. A thousand stories.
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Sisters are Sassy Studio was born in Tacloban City in April 2013 — not as a business, but as a calling. Two sisters with a deep love for people, celebration, and the small moments that quietly define a family decided to turn that love into something lasting. Over a decade later, the studio is still right here — still personal, still warm, and still honoured every time a family walks through our door.
              </p>
              <p>
                Every session starts the same way: we want you to feel completely at ease. Great portraits don&apos;t come from perfect poses — they come from real laughter, quiet tenderness, and the genuine warmth that happens when you stop thinking about the camera. Whether you&apos;re welcoming a new baby, marking a first birthday, capturing a maternity glow, or gathering the whole family for Christmas, our job is to create that space and let the moment speak for itself.
              </p>
              <p>
                What makes us different isn&apos;t a technique — it&apos;s how we show up. We know your newborn is four days old. We know your toddler won&apos;t sit still. We know your family has their own sense of humour and their own way of being together. We work with all of it, not around it. And what you take home isn&apos;t just edited photos — it&apos;s your family, exactly as you are right now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
