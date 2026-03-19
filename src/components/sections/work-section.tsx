import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left — book cover */}
          <div
            className={`flex items-center justify-center transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/83359ff7-b27c-43ae-adc6-670d9b4a97d9/files/8cfe7abc-abc3-46f7-b365-bbddfa5709c0.jpg"
                alt="Алиса в стране чудес — обложка"
                className="h-auto w-full max-w-xs rounded-lg shadow-2xl shadow-purple-900/50 md:max-w-sm"
              />
              <div className="absolute -bottom-4 -right-4 rounded-lg border border-foreground/20 bg-foreground/10 px-4 py-2 backdrop-blur-md">
                <p className="font-mono text-xs text-foreground/80">Подарочное издание</p>
                <p className="font-sans text-lg font-light text-foreground">890 ₽</p>
              </div>
            </div>
          </div>

          {/* Right — about the book */}
          <div className="flex flex-col justify-center">
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                О книге
              </h2>
              <p className="font-mono text-sm text-foreground/60 md:text-base">/ Льюис Кэрролл, 1865</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  number: "01",
                  title: "Классика на все времена",
                  description: "Одна из самых читаемых книг в мире — переведена на 174 языка и не выходит из печати 160 лет.",
                  direction: "right",
                },
                {
                  number: "02",
                  title: "12 захватывающих глав",
                  description: "От падения в кроличью нору до суда Червонной Королевы — каждая глава полна приключений и юмора.",
                  direction: "left",
                },
                {
                  number: "03",
                  title: "Иллюстрации Тенниела",
                  description: "Оригинальные гравюры сэра Джона Тенниела, ставшие символом эпохи викторианской фантастики.",
                  direction: "right",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`group flex items-start gap-4 border-l border-foreground/20 pl-4 transition-all duration-700 hover:border-foreground/40 md:pl-6 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : item.direction === "left"
                        ? "-translate-x-12 opacity-0"
                        : "translate-x-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${200 + i * 150}ms` }}
                >
                  <span className="font-mono text-xs text-foreground/30 mt-1">{item.number}</span>
                  <div>
                    <h3 className="mb-1 font-sans text-lg font-light text-foreground md:text-xl">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
