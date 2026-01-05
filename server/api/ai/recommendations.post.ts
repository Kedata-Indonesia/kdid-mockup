export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { prompt } = body

  const config = useRuntimeConfig()

  if (!config.geminiApiKey) {
    // Return fallback response if no API key
    return {
      advice: generateFallbackAdvice(prompt)
    }
  }

  try {
    // In production, integrate with Google Gemini API
    // const { GoogleGenerativeAI } = await import('@google/generative-ai')
    // const genAI = new GoogleGenerativeAI(config.geminiApiKey)
    // const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    // const result = await model.generateContent(...)

    // For now, return intelligent fallback
    return {
      advice: generateFallbackAdvice(prompt)
    }
  } catch (error) {
    console.error('AI Error:', error)
    return {
      advice: "I'm having trouble connecting right now, but based on your preferences, I'd recommend starting with our top-rated venues and working with a professional wedding planner to coordinate the rest!"
    }
  }
})

function generateFallbackAdvice(prompt: string): string {
  const lowercasePrompt = prompt.toLowerCase()

  let advice = "Based on your wedding vision, here are my recommendations:\n\n"

  // Budget analysis
  if (lowercasePrompt.includes('budget') || lowercasePrompt.includes('million')) {
    advice += "**Budget Planning:**\nFor a well-balanced wedding budget, consider allocating:\n- 40-50% for venue & catering\n- 10-15% for photography/videography\n- 10-15% for decoration\n- 5-10% for attire & makeup\n- 10-20% contingency\n\n"
  }

  // Venue suggestions
  if (lowercasePrompt.includes('intimate') || lowercasePrompt.includes('small')) {
    advice += "**Venue:**\nFor an intimate celebration, consider boutique venues or private gardens that offer a cozy atmosphere. Our Heritage Hotels Group venues are perfect for events up to 100 guests.\n\n"
  } else if (lowercasePrompt.includes('grand') || lowercasePrompt.includes('large')) {
    advice += "**Venue:**\nFor a grand celebration, our Royal Heritage Grand Ballroom can accommodate up to 1000 guests with premium amenities.\n\n"
  } else {
    advice += "**Venue:**\nStart by exploring our venue options based on your guest count. Consider both indoor and outdoor settings for your ceremony and reception.\n\n"
  }

  // Style suggestions
  if (lowercasePrompt.includes('rustic') || lowercasePrompt.includes('garden')) {
    advice += "**Decoration:**\nOur Rustic Garden Dreams Package would be perfect for you! It includes natural wooden elements, fresh flowers, and a beautiful entrance arch.\n\n"
  } else if (lowercasePrompt.includes('traditional') || lowercasePrompt.includes('javanese')) {
    advice += "**Attire & Makeup:**\nFor a traditional Javanese wedding, our Rias Putri Ayu vendor specializes in Paes Ageng with authentic cultural details.\n\n"
  }

  // General recommendations
  advice += "**Next Steps:**\n1. Browse our vendor categories to explore options\n2. Add your favorites to your booking list\n3. Contact vendors directly for detailed quotes\n4. Book early for your preferred date!\n\nI'm here to help you create your perfect day!"

  return advice
}
