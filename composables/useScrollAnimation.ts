export const useScrollAnimation = () => {
  const observedElements = ref<Map<Element, boolean>>(new Map())

  const observe = (el: Element | null, callback?: () => void) => {
    if (!el || observedElements.value.has(el)) return

    observedElements.value.set(el, false)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observedElements.value.set(el, true)
            callback?.()
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(el)
  }

  const isVisible = (el: Element | null) => {
    if (!el) return false
    return observedElements.value.get(el) ?? false
  }

  return {
    observe,
    isVisible,
    observedElements
  }
}
