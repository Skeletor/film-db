import { format } from 'date-fns'

export default class TextFormatter {
    static cropText(text) {
        const maxSymbolCount = 128
        let currentSymbolCount = 0
        let result = []

        text.split(' ').forEach((element) => {
            currentSymbolCount += element.length
            if (currentSymbolCount > maxSymbolCount)
                return

            result.push(element)
        });

        const resultText = result.join(' ')
        return currentSymbolCount <= maxSymbolCount ? resultText
                                                    : resultText.concat(' ...')
    }

    static formatTextDate(text) {
        try {
            return format(text, 'PP')
        } catch {
            return 'unknown'
        }
    }
}