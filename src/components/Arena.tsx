import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Terminal,
  X
} from 'lucide-react'
import { activeChains, type Language, type LadderStep } from '../data'

export function Arena({ language, onEarnXp }: { language: Language; onEarnXp: () => void }) {
  const isHi = language === 'HI'
  const chain = activeChains[0] // Frequency Mastery Ladder

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep: LadderStep = chain.steps[currentStepIndex]

  // Code state (initialized with starter code of Level 1)
  const [code, setCode] = useState(currentStep.starterCode)
  // Memory cache of passing code per level to power Continuous Refactor
  const [passedCodeMap, setPassedCodeMap] = useState<Record<number, string>>({})

  // Hint Tier (0 = closed, 1 = concept, 2 = edge case, 3 = pseudocode)
  const [hintTier, setHintTier] = useState<number>(0)

  // Test execution & Invariance testing states
  const [testRun, setTestRun] = useState(false)
  const [primaryPassed, setPrimaryPassed] = useState(false)
  const [invariancePending, setInvariancePending] = useState(false)
  const [invariancePassed, setInvariancePassed] = useState(false)
  const [outputLogs, setOutputLogs] = useState<string[]>([])
  const [xpAwardedSteps, setXpAwardedSteps] = useState<number[]>([])

  // Safe client-side evaluator for JavaScript functions
  const runCodeAgainstTestCases = () => {
    setTestRun(true)
    setOutputLogs([])
    setInvariancePending(false)
    setInvariancePassed(false)

    try {
      // Evaluate user function definition
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const evalScope = new Function(`
        ${code}
        if (typeof countFrequencies === 'function') return countFrequencies;
        if (typeof filterOddFrequencies === 'function') return filterOddFrequencies;
        throw new Error("No recognizable function declared. Check your function name.");
      `)
      const userFn = evalScope()

      // 1. Run Standard Test Cases
      const logs: string[] = []
      let allPassed = true

      for (let i = 0; i < currentStep.testCases.length; i++) {
        const tc = currentStep.testCases[i]
        const inputParsed = JSON.parse(tc.input)
        const actual = userFn(inputParsed)
        const actualStr = JSON.stringify(actual)

        if (actualStr === tc.expected) {
          logs.push(`✓ Test Case ${i + 1} Passed: Input ${tc.input} -> Output ${actualStr}`)
        } else {
          logs.push(`✗ Test Case ${i + 1} Failed: Expected ${tc.expected}, but got ${actualStr}`)
          allPassed = false
        }
      }

      setOutputLogs(logs)

      if (allPassed) {
        setPrimaryPassed(true)
        // Store code to carry forward to the next ladder step
        setPassedCodeMap((prev) => ({ ...prev, [currentStep.step]: code }))
        // Trigger Invariance Verification prompt
        setInvariancePending(true)
      } else {
        setPrimaryPassed(false)
      }
    } catch (err: unknown) {
      setPrimaryPassed(false)
      const errorMsg = err instanceof Error ? err.message : String(err)
      setOutputLogs([`Runtime Exception: ${errorMsg}`])
    }
  }

  // 2. Trigger Concept Invariance Test
  const runInvarianceVerification = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const evalScope = new Function(`
        ${code}
        if (typeof countFrequencies === 'function') return countFrequencies;
        if (typeof filterOddFrequencies === 'function') return filterOddFrequencies;
        throw new Error("Function not found.");
      `)
      const userFn = evalScope()
      const invTest = currentStep.invarianceTestCase
      const actual = JSON.stringify(userFn(JSON.parse(invTest.input)))

      if (actual === invTest.expected) {
        setInvariancePassed(true)
        setInvariancePending(false)
        setOutputLogs((prev) => [
          ...prev,
          `✦ Concept Invariance Passed! Input variation verified: ${invTest.input} -> ${actual}`
        ])

        if (!xpAwardedSteps.includes(currentStep.step)) {
          setXpAwardedSteps((prev) => [...prev, currentStep.step])
          onEarnXp()
        }
      } else {
        setInvariancePassed(false)
        setOutputLogs((prev) => [
          ...prev,
          `✗ Invariance Failed: Your logic broke on hidden input variation. Check edge cases!`
        ])
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setOutputLogs((prev) => [...prev, `Invariance Execution Error: ${errorMsg}`])
    }
  }

  // Step advancement in Micro-Ladder (Carries Level N code to Level N+1)
  const goToStep = (index: number) => {
    if (index >= chain.steps.length) return
    setCurrentStepIndex(index)
    const targetStep = chain.steps[index]

    // Continuous Refactor Engine: Load passed code from previous level
    if (index > 0 && passedCodeMap[index]) {
      setCode(
        `// Refactored from Level ${index}:\n${passedCodeMap[index]}\n\nfunction filterOddFrequencies(orders) {\n  const freqMap = countFrequencies(orders);\n  // Extract odd keys here:\n  \n}`
      )
    } else {
      setCode(targetStep.starterCode)
    }

    setTestRun(false)
    setPrimaryPassed(false)
    setInvariancePending(false)
    setInvariancePassed(false)
    setOutputLogs([])
    setHintTier(0)
  }

  return (
    <div className="page-enter arena-page">
      <div className="page-heading-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> {chain.track} • MICRO-LADDER
          </div>
          <h1>{isHi ? 'Micro-Ladder Chained Practice' : chain.title}</h1>
          <p>
            {isHi
              ? 'Pehle basic logic likho, fir agle level pe usi code ko refactor karo.'
              : 'Sequential micro-steps. Your working code carries forward into the next challenge.'}
          </p>
        </div>
        <div className="arena-stats">
          <span><Code2 size={15} /> Level {currentStep.step} of {chain.steps.length}</span>
          <span><Sparkles size={15} /> {xpAwardedSteps.length * 50} XP earned</span>
        </div>
      </div>

      {/* Ladder Step Selector */}
      <div className="arena-problem-picker">
        {chain.steps.map((step, idx) => {
          const isPassed = xpAwardedSteps.includes(step.step)
          return (
            <button
              key={step.step}
              className={`problem-chip ${idx === currentStepIndex ? 'problem-chip-active' : ''}`}
              onClick={() => goToStep(idx)}
            >
              <span className={`problem-status ${isPassed ? 'problem-status-done' : ''}`}>
                {isPassed ? <Check size={11} /> : `0${step.step}`}
              </span>
              <span>{isHi ? step.title.hi : step.title.en}</span>
              <span className="difficulty-dot diff-easy" />
            </button>
          )
        })}
      </div>

      <div className="arena-workspace">
        {/* Left: Problem & Socratic Guidance Panel */}
        <section className="problem-panel">
          <div className="problem-panel-top">
            <span className="problem-topic">LADDER STEP {currentStep.step}</span>
            <span className="difficulty-label difficulty-easy">{chain.difficulty}</span>
          </div>

          <h2>{isHi ? currentStep.title.hi : currentStep.title.en}</h2>
          <p className="problem-prompt">{isHi ? currentStep.prompt.hi : currentStep.prompt.en}</p>

          <div className="example-block">
            <div>
              <span>SAMPLE TEST CASES</span>
              <button title="Reset code" onClick={() => setCode(currentStep.starterCode)}>
                <RotateCcw size={13} />
              </button>
            </div>
            <pre>
              {currentStep.testCases.map((tc, i) => `Case ${i + 1}:\nInput: ${tc.input}\nExpected: ${tc.expected}\n\n`).join('')}
            </pre>
          </div>

          {/* Socratic Hint Scaffold with Progressive Tiers */}
          <div className="socratic-hint-container" style={{ marginTop: '1rem' }}>
            <button
              className={`hint-toggle ${hintTier > 0 ? 'hint-open' : ''}`}
              onClick={() => setHintTier(hintTier === 0 ? 1 : 0)}
            >
              <Lightbulb size={16} />
              {hintTier === 0 ? 'Need Socratic Guidance?' : 'Hide Socratic Hints'}
              <ChevronDown size={15} />
            </button>

            {hintTier > 0 && (
              <div className="hint-content" style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <button
                    className={`button ${hintTier === 1 ? 'button-primary' : 'button-quiet'}`}
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    onClick={() => setHintTier(1)}
                  >
                    Tier 1: Concept
                  </button>
                  <button
                    className={`button ${hintTier === 2 ? 'button-primary' : 'button-quiet'}`}
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    onClick={() => setHintTier(2)}
                  >
                    Tier 2: Edge Case
                  </button>
                  <button
                    className={`button ${hintTier === 3 ? 'button-primary' : 'button-quiet'}`}
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    onClick={() => setHintTier(3)}
                  >
                    Tier 3: Pseudocode
                  </button>
                </div>

                <span>
                  {hintTier === 1 && 'SOCRATIC QUESTION (CONCEPT)'}
                  {hintTier === 2 && 'EDGE-CASE SPOTLIGHT'}
                  {hintTier === 3 && 'STRUCTURAL PSEUDOCODE (NO SPOILERS)'}
                </span>

                <p style={{ marginTop: '0.25rem' }}>
                  {hintTier === 1 && (isHi ? currentStep.socraticHints.tier1_concept.hi : currentStep.socraticHints.tier1_concept.en)}
                  {hintTier === 2 && (isHi ? currentStep.socraticHints.tier2_edgeCase.hi : currentStep.socraticHints.tier2_edgeCase.en)}
                  {hintTier === 3 && (isHi ? currentStep.socraticHints.tier3_pseudocode.hi : currentStep.socraticHints.tier3_pseudocode.en)}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Right: Code Editor & Execution Panel */}
        <section className="editor-panel">
          <div className="editor-header">
            <div className="editor-tabs">
              <span className="editor-tab-active">
                <Code2 size={14} /> solution.js <i />
              </span>
            </div>
            <button className="editor-language">JavaScript</button>
          </div>

          <div className="code-editor">
            <div className="line-numbers">
              {code.split('\n').map((_, index) => (
                <span key={index}>{String(index + 1).padStart(2, '0')}</span>
              ))}
            </div>
            <textarea
              spellCheck={false}
              aria-label="Code editor"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setTestRun(false)
              }}
            />
          </div>

          <div className="editor-actions">
            <button className="button button-quiet" onClick={() => setHintTier((prev) => (prev % 3) + 1)}>
              <Lightbulb size={14} /> Socratic Nudge
            </button>
            <button className="button button-primary" onClick={runCodeAgainstTestCases}>
              <Play size={14} fill="currentColor" /> Run Test Cases
            </button>
          </div>

          {/* Test Feedback & Output Console */}
          <div className={`test-results ${testRun ? (primaryPassed ? 'result-pass' : 'result-fail') : ''}`}>
            <div className="test-results-head">
              <span><Terminal size={14} /> RUNTIME FEEDBACK & CONSOLE</span>
              {testRun && (
                <span className="test-result-status">
                  {primaryPassed ? (
                    <><Check size={12} /> Standard Tests Passed</>
                  ) : (
                    <><X size={12} /> Failed Tests</>
                  )}
                </span>
              )}
            </div>

            {testRun ? (
              <div className="test-result-body" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                {outputLogs.map((log, i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    {log}
                  </div>
                ))}

                {/* Concept Invariance Gate UI */}
                {invariancePending && !invariancePassed && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255, 180, 0, 0.1)', border: '1px solid #eab308', borderRadius: '6px', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#facc15' }}>
                      <ShieldAlert size={16} /> ANTI-MEMORIZATION: CONCEPT INVARIANCE CHECK
                    </div>
                    <p style={{ fontSize: '0.8rem', margin: '4px 0 8px 0' }}>
                      Your primary tests passed! Run the hidden invariant check on modified constraints to verify real comprehension and unlock XP.
                    </p>
                    <button className="button button-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={runInvarianceVerification}>
                      Verify Understanding & Unlock XP
                    </button>
                  </div>
                )}

                {invariancePassed && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.85rem' }}>
                      ✓ Mastery verified! Ready for the next ladder step.
                    </span>
                    {currentStepIndex + 1 < chain.steps.length && (
                      <button
                        className="button button-primary"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => goToStep(currentStepIndex + 1)}
                      >
                        Proceed to Level {currentStep.step + 1} <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="test-empty">
                <CircleHelp size={16} />
                <span>Write your function and click "Run Test Cases" to inspect execution results.</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}