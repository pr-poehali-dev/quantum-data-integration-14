import { useReveal } from "@/hooks/use-reveal"

const reviews = [
  {
    name: "Мария К.",
    city: "Москва",
    text: "Подарила дочери на день рождения — она влюбилась! Книга просто потрясающая: бумага плотная, иллюстрации чёткие, переплёт крепкий. Настоящее подарочное издание.",
    rating: 5,
  },
  {
    name: "Алексей П.",
    city: "Санкт-Петербург",
    text: "Читал Алису ещё в детстве, но это издание — совсем другой уровень. Оригинальные иллюстрации Тенниела выглядят великолепно. Доставили быстро, упаковка отличная.",
    rating: 5,
  },
  {
    name: "Светлана В.",
    city: "Екатеринбург",
    text: "Брала как подарок коллеге — все в восторге. Выглядит дорого и стильно, а цена очень приятная. Буду заказывать ещё для других друзей.",
    rating: 5,
  },
  {
    name: "Дмитрий Н.",
    city: "Казань",
    text: "Классика, которую должен прочитать каждый. Это издание особенно хорошо — перевод бережный, а картинки погружают в атмосферу викторианской Англии.",
    rating: 5,
  },
]

export function ReviewsSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Отзывы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что говорят читатели</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`flex flex-col gap-4 border border-foreground/10 rounded-lg p-6 backdrop-blur-sm bg-foreground/5 transition-all duration-700 hover:border-foreground/25 hover:bg-foreground/8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80 flex-1">
                «{review.text}»
              </p>
              <div className="border-t border-foreground/10 pt-3">
                <p className="font-sans text-sm font-light text-foreground">{review.name}</p>
                <p className="font-mono text-xs text-foreground/50">{review.city}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-10 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <button
            onClick={() => scrollToSection?.(5)}
            className="font-mono text-sm text-foreground/60 border-b border-foreground/20 pb-0.5 hover:text-foreground/90 hover:border-foreground/50 transition-all"
          >
            Оформить заказ →
          </button>
        </div>
      </div>
    </section>
  )
}
