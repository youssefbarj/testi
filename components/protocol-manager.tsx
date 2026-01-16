"use client"

import { useState, useRef } from "react"
import { BrainCircuit, CheckCircle2, XCircle, ArrowDownCircle, X } from "lucide-react"

const ProtocolManager = () => {
  const [activeTab, setActiveTab] = useState("preparation")
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({})

  // Quiz states
  const [quizQuestion, setQuizQuestion] = useState<{
    question: string
    options: string[]
    answer: number
    explanation: string
  } | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const checklistRef = useRef<HTMLDivElement>(null)

  const toggleStep = (section: string, index: number) => {
    const key = `${section}-${index}`
    setCheckedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const scrollToChecklist = () => {
    checklistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const protocols = {
    preparation: {
      title: "1. Préparation & Hygiène (Général)",
      color: "bg-purple-600",
      description: "À réaliser impérativement avant toute technique.",
      steps: [
        "Préparer le matériel et l'espace de travail (asepsie).",
        "Désinfecter soigneusement les mains.",
        "Démaquiller et épiler les sourcils de la cliente.",
        "Dessiner la forme des sourcils selon la morphologie (Mapping).",
        "Appliquer la crème anesthésiante + film plastique (Pose : 15 à 30 min).",
        "Enfiler des gants jetables stériles.",
        "Retirer l'anesthésiant et désinfecter la zone.",
        "Essuyer régulièrement les excès de pigment ou de sang durant la procédure.",
        "Nettoyer soigneusement la zone en fin de séance.",
        "Appliquer une crème cicatrisante apaisante.",
      ],
    },
    microblading: {
      title: "2. Protocole Microblading",
      color: "bg-pink-600",
      description: "Technique manuelle poil à poil.",
      steps: [
        "Vérifier que le stylo manuel et la lame (nano-blade) sont stériles.",
        "Désinfecter à nouveau vos gants si vous avez touché d'autres objets.",
        "Vérifier le tracé (mapping) une dernière fois avant d'inciser.",
        "Tremper la lame dans le pigment (ne pas surcharger).",
        "Tendre la peau fermement avec trois doigts.",
        "Réaliser le tracé en respectant le sens de pousse du poil (90°).",
        "Travailler poil à poil avec une pression constante mais douce.",
        "Effectuer le 'Masking' (laisser poser le pigment) si nécessaire.",
        "Nettoyer la zone délicatement pour révéler le tracé.",
        "Appliquer la crème de soin post-traitement.",
      ],
    },
    microshading: {
      title: "3. Protocole Microshading",
      color: "bg-indigo-600",
      description: "Technique électrique effet poudré.",
      steps: [
        "Préparer et stériliser la machine de shading (dermographe).",
        "Vérifier l'aiguille et préparer le pigment adapté à la cliente.",
        "Maintenir la peau bien tendue pour une application homogène.",
        "Commencer le shading par la queue du sourcil.",
        "Avancer progressivement vers le corps, puis la tête du sourcil.",
        "Travailler en couches légères et progressives (pixel effect).",
        "Adoucir l'avant du sourcil (tête) pour un effet poudré naturel (dégradé).",
        "Recouvrir les sourcils avec du pigment et un film plastique (10 à 15 minutes).",
        "Répéter la technique sur l'autre sourcil en vérifiant la symétrie.",
        "Nettoyer, apaiser la peau et appliquer une crème cicatrisante.",
      ],
    },
  }

  // Local quiz questions
  const quizData: Record<
    string,
    Array<{ question: string; options: string[]; answer: number; explanation: string }>
  > = {
    preparation: [
      {
        question: "Combien de temps faut-il laisser poser la crème anesthésiante ?",
        options: ["5 minutes", "15 à 30 minutes", "1 heure"],
        answer: 1,
        explanation:
          "Le temps de pose idéal pour une efficacité maximale sans irriter la peau est de 15 à 30 minutes sous film plastique.",
      },
      {
        question: "Quelle est la toute première étape avant de toucher la cliente ?",
        options: ["Le mapping", "Désinfecter les mains", "Préparer le matériel (Asepsie)"],
        answer: 2,
        explanation:
          "L'installation du poste de travail en conditions stériles (asepsie) est la priorité absolue avant tout contact.",
      },
      {
        question: "Que faire immédiatement après avoir retiré l'anesthésiant ?",
        options: ["Commencer à piquer", "Désinfecter la zone", "Appliquer le pigment"],
        answer: 1,
        explanation:
          "Il faut toujours désinfecter la peau après avoir retiré la crème anesthésiante pour travailler sur une zone propre.",
      },
    ],
    microblading: [
      {
        question: "Quel outil utilise-t-on pour le Microblading ?",
        options: ["Un dermographe électrique", "Un stylo manuel avec nano-blade", "Une aiguille de tatouage classique"],
        answer: 1,
        explanation:
          "Le Microblading est une technique manuelle qui utilise un stylo spécifique équipé d'une lame très fine (nano-blade).",
      },
      {
        question: "Comment doit être la peau pendant l'incision ?",
        options: ["Relâchée", "Légèrement tendue", "Tendue fermement avec 3 doigts"],
        answer: 2,
        explanation:
          "Une tension ferme à 3 doigts est cruciale pour des traits nets et pour éviter de couper la peau trop profondément.",
      },
      {
        question: "À quel angle doit-on tenir le stylo ?",
        options: ["45 degrés", "90 degrés (perpendiculaire)", "180 degrés"],
        answer: 1,
        explanation: "Le stylo doit être tenu à 90 degrés par rapport à la peau pour une insertion précise du pigment.",
      },
    ],
    microshading: [
      {
        question: "Par quelle zone du sourcil commence-t-on généralement le Microshading ?",
        options: ["La tête du sourcil", "L'arche", "La queue du sourcil"],
        answer: 2,
        explanation:
          "On commence souvent par la queue pour définir la structure la plus foncée, en remontant vers la tête.",
      },
      {
        question: "Quel effet recherche-t-on sur la tête du sourcil ?",
        options: ["Un contour très net", "Un effet poudré/dégradé naturel", "Une couleur unie"],
        answer: 1,
        explanation:
          "La tête du sourcil doit être plus claire et fondue (effet dégradé) pour éviter un regard trop dur.",
      },
      {
        question: "Quelle est la différence principale avec le Microblading ?",
        options: ["C'est une technique électrique (points)", "C'est manuel (traits)", "Ça dure moins longtemps"],
        answer: 0,
        explanation:
          "Le Microshading utilise une machine électrique pour créer des pixels (points), contrairement aux traits manuels du Microblading.",
      },
    ],
  }

  const calculateProgress = (section: string) => {
    const total = protocols[section as keyof typeof protocols].steps.length
    const completed = protocols[section as keyof typeof protocols].steps.filter(
      (_, idx) => checkedSteps[`${section}-${idx}`],
    ).length
    return Math.round((completed / total) * 100)
  }

  const handleOpenQuiz = () => {
    setSelectedOption(null)
    const questions = quizData[activeTab]
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    setQuizQuestion(randomQuestion)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Protocoles Techniques</h1>
          <p className="text-slate-300">Récapitulatif interactif des procédures standards</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row border-b border-slate-200">
          {Object.entries(protocols).map(([key, data]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key)
                setQuizQuestion(null)
                setSelectedOption(null)
              }}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all duration-300 ${
                activeTab === key ? `${data.color} text-white shadow-inner` : "hover:bg-slate-50 text-slate-500"
              }`}
            >
              <span className="font-semibold">{data.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                {protocols[activeTab as keyof typeof protocols].title}
              </h2>
              <p className="text-slate-500 text-sm">{protocols[activeTab as keyof typeof protocols].description}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Quiz Button */}
              <button
                onClick={handleOpenQuiz}
                className="text-slate-600 hover:text-purple-600 border border-slate-200 hover:border-purple-300 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors bg-white hover:bg-purple-50 hover:shadow-sm"
              >
                <BrainCircuit className="w-4 h-4" />
                Quiz Rapide
              </button>

              {/* Progress Circle */}
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={175}
                    strokeDashoffset={175 - (175 * calculateProgress(activeTab)) / 100}
                    className={`${protocols[activeTab as keyof typeof protocols].color.replace("bg-", "text-")} transition-all duration-500 ease-out`}
                  />
                </svg>
                <span
                  className={`absolute text-xs font-bold ${protocols[activeTab as keyof typeof protocols].color.replace("bg-", "text-")}`}
                >
                  {calculateProgress(activeTab)}%
                </span>
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          {quizQuestion && (
            <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-inner">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5" /> Question de Révision
                </h3>
                <button
                  onClick={() => setQuizQuestion(null)}
                  className="text-indigo-400 hover:text-indigo-600 p-1 hover:bg-indigo-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-indigo-800 font-medium mb-4 text-lg">{quizQuestion.question}</p>

              <div className="space-y-3">
                {quizQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx
                  const isCorrect = idx === quizQuestion.answer
                  const showResult = selectedOption !== null

                  let buttonStyle =
                    "bg-white border-indigo-200 text-slate-700 hover:bg-indigo-100 hover:border-indigo-300"
                  let icon = null

                  if (showResult) {
                    if (isCorrect) {
                      buttonStyle = "bg-green-100 border-green-500 text-green-900 font-medium ring-1 ring-green-500"
                      icon = <CheckCircle2 className="w-5 h-5 text-green-600" />
                    } else if (isSelected) {
                      buttonStyle = "bg-red-50 border-red-400 text-red-900 ring-1 ring-red-400"
                      icon = <XCircle className="w-5 h-5 text-red-600" />
                    } else {
                      buttonStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showResult}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-4 border rounded-xl text-base transition-all duration-200 flex justify-between items-center ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {icon}
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {selectedOption !== null && (
                <div
                  className={`mt-4 p-4 rounded-xl border flex flex-col gap-3 ${
                    selectedOption === quizQuestion.answer
                      ? "bg-green-50 border-green-200 text-green-900"
                      : "bg-red-50 border-red-200 text-red-900"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl">{selectedOption === quizQuestion.answer ? "🎉" : "⚠️"}</div>
                    <div>
                      <div className="font-bold mb-1">
                        {selectedOption === quizQuestion.answer ? "Bonne réponse !" : "Pas tout à fait..."}
                      </div>
                      <div className="text-sm opacity-90 leading-relaxed">{quizQuestion.explanation}</div>
                    </div>
                  </div>

                  {selectedOption !== quizQuestion.answer && (
                    <button
                      onClick={scrollToChecklist}
                      className="mt-2 w-full flex items-center justify-center gap-2 bg-white bg-opacity-60 border border-red-200 hover:bg-red-100 text-red-800 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <ArrowDownCircle className="w-4 h-4" />
                      Revoir la checklist ci-dessous
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Checklist */}
          <div className="space-y-3" ref={checklistRef}>
            {protocols[activeTab as keyof typeof protocols].steps.map((step, index) => {
              const isChecked = checkedSteps[`${activeTab}-${index}`]
              return (
                <div
                  key={index}
                  onClick={() => toggleStep(activeTab, index)}
                  className={`group flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    isChecked
                      ? "border-green-500 bg-green-50"
                      : "border-slate-100 hover:border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  <div
                    className={`mt-1 mr-4 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isChecked ? "border-green-500 bg-green-500" : "border-slate-300 group-hover:border-purple-400"
                    }`}
                  >
                    {isChecked && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />}
                  </div>
                  <span
                    className={`text-lg leading-relaxed select-none transition-colors duration-200 ${
                      isChecked ? "text-slate-500 line-through decoration-slate-300" : "text-slate-700"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100 flex items-start gap-3">
            <div className="mt-1 font-bold text-lg">i</div>
            <p>
              <strong>Note importante :</strong> Ce protocole est un guide général. Adaptez toujours les procédures aux
              besoins spécifiques de chaque cliente et aux réglementations en vigueur.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtocolManager
