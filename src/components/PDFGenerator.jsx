/**
 * PDFGenerator - Component for generating branded PDF from PRD data
 */
import { useState } from 'react'
import jsPDF from 'jspdf'
import { pdfStyles } from '../utils/pdfStyles'
import { transliteratePolish } from '../utils/pdfFonts'
import { drawLogoIcon } from '../utils/logoData'

/**
 * PDF Generator class - uses helvetica font with Polish transliteration
 */
class PRDPdfGenerator {
  constructor(prdData) {
    this.doc = new jsPDF()
    this.prdData = prdData
    this.styles = pdfStyles
    this.y = 0
    this.pageNumber = 1
  }

  /**
   * Process text - transliterate Polish characters
   */
  t(str) {
    if (!str) return ''
    return transliteratePolish(str)
  }

  checkPageBreak(requiredSpace = 30) {
    const maxY = this.styles.page.height - this.styles.margins.bottom - 10
    if (this.y + requiredSpace > maxY) {
      this.addNewPage()
    }
  }

  addNewPage() {
    this.doc.addPage()
    this.pageNumber++
    this.y = this.styles.margins.top + 5
  }

  drawHeader() {
    const { page, margins } = this.styles

    // Header background
    this.doc.setFillColor(77, 101, 255)
    this.doc.rect(0, 0, page.width, 55, 'F')

    // Accent stripe
    this.doc.setFillColor(0, 217, 165)
    this.doc.rect(0, 55, page.width, 3, 'F')

    // Logo icon
    drawLogoIcon(this.doc, margins.left, 5, 0.5)

    // Brand name (next to logo)
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setFontSize(10)
    this.doc.text('AI PRODUCT HEROES', margins.left + 20, 12)

    // Badge
    this.doc.setFillColor(255, 255, 255)
    this.doc.roundedRect(page.width - margins.right - 50, 6, 50, 8, 2, 2, 'F')
    this.doc.setTextColor(77, 101, 255)
    this.doc.setFontSize(8)
    this.doc.text('PRD DOCUMENT', page.width - margins.right - 25, 11.5, { align: 'center' })

    // Title
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(24)
    this.doc.setFont('helvetica', 'bold')
    const title = this.t(this.prdData.title || 'Product Requirements Document')
    const titleLines = this.doc.splitTextToSize(title, page.contentWidth - 20)
    this.doc.text(titleLines, margins.left, 32)

    // Subtitle
    this.doc.setFontSize(11)
    this.doc.setFont('helvetica', 'normal')
    this.doc.text('Product Requirements Document', margins.left, 48)

    this.y = 70
    this.drawMetaInfo()
  }

  drawMetaInfo() {
    const { margins, page } = this.styles
    const cardY = this.y
    const cardHeight = 28
    const cardWidth = (page.contentWidth - 10) / 3

    this.doc.setFillColor(248, 249, 250)
    this.doc.roundedRect(margins.left, cardY, page.contentWidth, cardHeight, 3, 3, 'F')

    const metaItems = [
      { label: 'Autor', value: this.prdData.author || 'Nie podano' },
      { label: 'Zespol', value: this.t(this.prdData.team) || 'Nie podano' },
      { label: 'Data', value: new Date().toLocaleDateString('pl-PL') }
    ]

    metaItems.forEach((item, index) => {
      const x = margins.left + (cardWidth * index) + 8

      if (index > 0) {
        this.doc.setDrawColor(220, 220, 220)
        this.doc.setLineWidth(0.3)
        this.doc.line(margins.left + (cardWidth * index), cardY + 5, margins.left + (cardWidth * index), cardY + cardHeight - 5)
      }

      this.doc.setTextColor(108, 117, 125)
      this.doc.setFontSize(9)
      this.doc.setFont('helvetica', 'normal')
      this.doc.text(item.label, x, cardY + 10)

      this.doc.setTextColor(26, 26, 46)
      this.doc.setFontSize(11)
      this.doc.setFont('helvetica', 'bold')
      const valueText = this.doc.splitTextToSize(this.t(item.value), cardWidth - 15)
      this.doc.text(valueText[0] || '-', x, cardY + 20)
    })

    this.y = cardY + cardHeight + 15
  }

  drawSectionHeader(number, title, color = 'primary') {
    this.checkPageBreak(35)
    const { margins, page } = this.styles
    this.y += 5

    const colors = {
      primary: [77, 101, 255],
      mint: [0, 217, 165],
      secondary: [26, 26, 46]
    }
    const bgColor = colors[color] || colors.primary

    // Left bar
    this.doc.setFillColor(bgColor[0], bgColor[1], bgColor[2])
    this.doc.rect(margins.left, this.y, 4, 12, 'F')

    // Number badge
    this.doc.circle(margins.left + 14, this.y + 6, 5, 'F')
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(String(number), margins.left + 14, this.y + 7.5, { align: 'center' })

    // Title
    this.doc.setTextColor(26, 26, 46)
    this.doc.setFontSize(14)
    this.doc.text(this.t(title), margins.left + 24, this.y + 8)

    // Line
    this.doc.setDrawColor(230, 230, 230)
    this.doc.setLineWidth(0.5)
    this.doc.line(margins.left, this.y + 14, margins.left + page.contentWidth, this.y + 14)

    this.y += 22
  }

  drawText(text) {
    if (!text || text.trim() === '') {
      this.doc.setTextColor(173, 181, 189)
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'italic')
      this.doc.text('(brak danych)', this.styles.margins.left, this.y)
      this.y += 7
      return
    }

    this.doc.setTextColor(26, 26, 46)
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')

    // Use slightly narrower width to prevent word breaking issues
    const textWidth = this.styles.page.contentWidth - 5
    const lines = this.doc.splitTextToSize(this.t(text), textWidth)

    for (const line of lines) {
      this.checkPageBreak(7)
      this.doc.text(line, this.styles.margins.left, this.y)
      this.y += 6 // Increased line height for better readability
    }
    this.y += 4
  }

  drawField(label, value) {
    this.checkPageBreak(15)
    this.doc.setTextColor(77, 101, 255)
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(this.t(label), this.styles.margins.left, this.y)
    this.y += 6
    this.drawText(value)
  }

  drawBulletList(text, bulletColor = 'primary') {
    if (!text || text.trim() === '') {
      this.drawText('')
      return
    }

    const items = text.split(/\n/).map(item => item.replace(/^[•\-\*]\s*/, '').trim()).filter(item => item.length > 0)
    if (items.length === 0) {
      this.drawText('')
      return
    }

    const colors = { primary: [77, 101, 255], mint: [0, 217, 165] }
    const bColor = colors[bulletColor] || colors.primary

    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')

    for (const item of items) {
      // Use wider text area for bullet items
      const textWidth = this.styles.page.contentWidth - 15
      const lines = this.doc.splitTextToSize(this.t(item), textWidth)

      this.checkPageBreak(6 + lines.length * 6)

      // Draw bullet
      this.doc.setFillColor(bColor[0], bColor[1], bColor[2])
      this.doc.circle(this.styles.margins.left + 4, this.y + 1, 2, 'F')

      // Draw text lines
      this.doc.setTextColor(26, 26, 46)
      for (let i = 0; i < lines.length; i++) {
        this.doc.text(lines[i], this.styles.margins.left + 10, this.y + 2)
        this.y += 6
      }
      this.y += 2
    }
    this.y += 4
  }

  drawPersonasTable(personas) {
    const hasData = personas.some(p => p.name || p.description)
    if (!hasData) {
      this.drawText('')
      return
    }

    const filledPersonas = personas.filter(p => p.name || p.description)

    filledPersonas.forEach((persona, index) => {
      const personaName = this.t(persona.name) || 'Persona'
      const description = this.t(persona.description) || '-'

      // Calculate how many lines description will need
      const descWidth = this.styles.page.contentWidth - 20
      const descLines = this.doc.splitTextToSize(description, descWidth)
      const cardHeight = Math.max(24, 16 + (descLines.length * 5))

      this.checkPageBreak(cardHeight + 5)

      // Draw persona card background
      this.doc.setFillColor(248, 249, 250)
      this.doc.roundedRect(this.styles.margins.left, this.y, this.styles.page.contentWidth, cardHeight, 3, 3, 'F')

      // Persona number badge
      this.doc.setFillColor(77, 101, 255)
      this.doc.circle(this.styles.margins.left + 10, this.y + 10, 6, 'F')
      this.doc.setTextColor(255, 255, 255)
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(String(index + 1), this.styles.margins.left + 10, this.y + 12, { align: 'center' })

      // Persona name
      this.doc.setTextColor(26, 26, 46)
      this.doc.setFontSize(11)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(personaName, this.styles.margins.left + 22, this.y + 11)

      // Description on next line(s)
      this.doc.setTextColor(26, 26, 46)
      this.doc.setFontSize(9)
      this.doc.setFont('helvetica', 'normal')

      let descY = this.y + 18
      for (const line of descLines) {
        this.doc.text(line, this.styles.margins.left + 22, descY)
        descY += 5
      }

      this.y += cardHeight + 6
    })

    this.y += 3
  }

  drawNumberedList(items) {
    const filteredItems = items.filter(item => item && item.trim())
    if (filteredItems.length === 0) {
      this.drawText('')
      return
    }

    filteredItems.forEach((item, index) => {
      this.checkPageBreak(15)

      this.doc.setFillColor(248, 249, 250)
      this.doc.roundedRect(this.styles.margins.left, this.y - 4, this.styles.page.contentWidth, 14, 2, 2, 'F')

      this.doc.setFillColor(77, 101, 255)
      this.doc.circle(this.styles.margins.left + 6, this.y + 2, 4, 'F')
      this.doc.setTextColor(255, 255, 255)
      this.doc.setFontSize(8)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(String(index + 1), this.styles.margins.left + 6, this.y + 3.5, { align: 'center' })

      this.doc.setTextColor(26, 26, 46)
      this.doc.setFontSize(10)
      this.doc.setFont('helvetica', 'normal')

      const lines = this.doc.splitTextToSize(this.t(item), this.styles.page.contentWidth - 20)
      this.doc.text(lines[0], this.styles.margins.left + 14, this.y + 3)

      if (lines.length > 1) {
        for (let i = 1; i < lines.length; i++) {
          this.y += 5
          this.doc.text(lines[i], this.styles.margins.left + 14, this.y + 3)
        }
      }
      this.y += 12
    })
    this.y += 3
  }

  addFooters() {
    const totalPages = this.doc.internal.getNumberOfPages()
    const { margins, page } = this.styles

    for (let i = 1; i <= totalPages; i++) {
      this.doc.setPage(i)

      this.doc.setFillColor(248, 249, 250)
      this.doc.rect(0, page.height - 18, page.width, 18, 'F')

      this.doc.setFillColor(0, 217, 165)
      this.doc.rect(0, page.height - 18, page.width, 1, 'F')

      this.doc.setFontSize(8)
      this.doc.setTextColor(108, 117, 125)
      this.doc.setFont('helvetica', 'normal')
      this.doc.text('Wygenerowano przez aiproductheroes.pl', margins.left, page.height - 8)

      this.doc.setTextColor(77, 101, 255)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('AI PRODUCT HEROES', page.width / 2, page.height - 8, { align: 'center' })

      this.doc.setTextColor(108, 117, 125)
      this.doc.setFont('helvetica', 'normal')
      this.doc.text(`${i} / ${totalPages}`, page.width - margins.right, page.height - 8, { align: 'right' })
    }
  }

  generate() {
    this.drawHeader()

    this.drawSectionHeader(1, 'Przeglad', 'primary')
    this.drawText(this.prdData.overview)

    this.drawSectionHeader(2, 'Problem', 'primary')
    this.drawText(this.prdData.problem)

    this.drawSectionHeader(3, 'Cele', 'mint')
    this.drawNumberedList(this.prdData.objectives)

    this.drawSectionHeader(4, 'Ograniczenia', 'mint')
    this.drawNumberedList(this.prdData.constraints)

    this.drawSectionHeader(5, 'Persony', 'primary')
    this.drawPersonasTable(this.prdData.personas)

    this.drawSectionHeader(6, 'Scenariusze uzycia', 'primary')
    const useCases = this.prdData.useCases.filter(u => u && u.trim())
    if (useCases.length > 0) {
      useCases.forEach((useCase, index) => {
        // Process text - convert arrows to readable format and split into steps
        const processedText = this.t(useCase)

        // Check for page break before starting
        this.checkPageBreak(30)

        // Draw scenario header with number badge
        this.doc.setFillColor(248, 249, 250)
        this.doc.roundedRect(this.styles.margins.left, this.y - 2, this.styles.page.contentWidth, 12, 2, 2, 'F')

        this.doc.setFillColor(77, 101, 255)
        this.doc.circle(this.styles.margins.left + 8, this.y + 4, 5, 'F')
        this.doc.setTextColor(255, 255, 255)
        this.doc.setFontSize(9)
        this.doc.setFont('helvetica', 'bold')
        this.doc.text(String(index + 1), this.styles.margins.left + 8, this.y + 5.5, { align: 'center' })

        // Scenario label
        this.doc.setTextColor(26, 26, 46)
        this.doc.setFontSize(11)
        this.doc.setFont('helvetica', 'bold')
        this.doc.text(`Scenariusz ${index + 1}`, this.styles.margins.left + 18, this.y + 5)
        this.y += 16

        // Scenario content - use wider text area
        this.doc.setTextColor(26, 26, 46)
        this.doc.setFontSize(10)
        this.doc.setFont('helvetica', 'normal')

        // Split text into lines with proper word boundaries
        const textWidth = this.styles.page.contentWidth - 10
        const lines = this.doc.splitTextToSize(processedText, textWidth)

        for (const line of lines) {
          this.checkPageBreak(6)
          this.doc.text(line, this.styles.margins.left + 5, this.y)
          this.y += 6
        }
        this.y += 10 // Extra space between scenarios
      })
    } else {
      this.drawText('')
    }

    this.drawSectionHeader(7, 'Funkcjonalnosci (In Scope)', 'mint')
    this.drawBulletList(this.prdData.featuresIn, 'mint')

    this.drawSectionHeader(8, 'Poza zakresem (Out of Scope)', 'secondary')
    this.drawBulletList(this.prdData.featuresOut, 'primary')

    this.drawSectionHeader(9, 'Metryki sukcesu', 'mint')
    this.drawBulletList(this.prdData.successMetrics, 'mint')

    this.addFooters()

    return this.doc
  }

  save() {
    const doc = this.generate()
    const sanitizedTitle = transliteratePolish(this.prdData.title || 'PRD')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 30)
    const date = new Date().toISOString().split('T')[0]
    doc.save(`PRD_${sanitizedTitle}_${date}.pdf`)
  }
}

export function generatePDF(prdData) {
  if (!prdData) throw new Error('No PRD data provided')
  const generator = new PRDPdfGenerator(prdData)
  generator.save()
}

function PDFGenerator({ prdData, disabled }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (isGenerating) return
    setIsGenerating(true)
    try {
      generatePDF(prdData)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Wystapil blad podczas generowania PDF.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={disabled || isGenerating}
      className="group/btn bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-xl font-semibold shadow-btn hover:shadow-btn-hover transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 flex items-center justify-center gap-2.5 min-w-[180px] cursor-pointer"
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generowanie...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generuj PDF
        </>
      )}
    </button>
  )
}

export default PDFGenerator
