'use client';

import { useState } from 'react';

type Personality = 'cozy' | 'zen' | 'social';

interface Option {
  emoji: string;
  label: string;
  personality: Personality;
}

interface Question {
  text: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    text: 'Pick your Hogwarts house',
    options: [
      { emoji: '🦁', label: 'Gryffindor — brave and bold', personality: 'social' },
      { emoji: '🦅', label: 'Ravenclaw — thoughtful and independent', personality: 'zen' },
      { emoji: '🦡', label: 'Hufflepuff — loyal and warm', personality: 'cozy' },
      { emoji: '🐍', label: 'Slytherin — strategic and ambitious', personality: 'social' },
    ],
  },
  {
    text: "It's Friday night. Friends are picking a movie. You choose:",
    options: [
      { emoji: '🛋️', label: 'A cozy rom-com everyone knows by heart', personality: 'cozy' },
      { emoji: '🎬', label: "An indie film with subtitles you've been meaning to watch", personality: 'zen' },
      { emoji: '🍿', label: 'Whatever the group wants — you just love movie nights', personality: 'social' },
    ],
  },
  {
    text: 'Your Netflix profile looks like:',
    options: [
      { emoji: '🔁', label: 'The same 3 comfort shows on repeat', personality: 'cozy' },
      { emoji: '📺', label: 'One carefully chosen series at a time, no bingeing', personality: 'zen' },
      { emoji: '👥', label: "A mix of everything — always getting recs from friends", personality: 'social' },
    ],
  },
  {
    text: "You're at a party. Where are you?",
    options: [
      { emoji: '🛋️', label: "Curled up with the host's dog in the corner", personality: 'cozy' },
      { emoji: '🌿', label: 'On the balcony, enjoying a quiet moment', personality: 'zen' },
      { emoji: '🎉', label: "Somehow knowing everyone's name by hour two", personality: 'social' },
    ],
  },
  {
    text: 'Pick your dream vacation:',
    options: [
      { emoji: '🏡', label: 'A countryside cottage with books and blankets', personality: 'cozy' },
      { emoji: '🏔️', label: 'A solo hiking trip with no itinerary', personality: 'zen' },
      { emoji: '🌍', label: 'A group trip with friends, packed schedule', personality: 'social' },
    ],
  },
];

const PERSONALITIES = {
  cozy: {
    name: 'Cozy Classic',
    coffee: 'Medium Roast Drip',
    tagline: 'Comfort in every cup',
    emoji: '☕',
  },
  zen: {
    name: 'Zen Minimalist',
    coffee: 'Black Coffee, Single Origin',
    tagline: 'Simple. Clean. Perfect.',
    emoji: '🍵',
  },
  social: {
    name: 'Social Butterfly',
    coffee: 'Cappuccino',
    tagline: 'Coffee is better with company',
    emoji: '✨',
  },
};

function calculateResults(answers: Record<number, string>): { personality: Personality; percent: number }[] {
  const counts: Record<Personality, number> = { cozy: 0, zen: 0, social: 0 };
  const total = Object.keys(answers).length;

  for (const personality of Object.values(answers)) {
    counts[personality as Personality]++;
  }

  return (Object.keys(counts) as Personality[])
    .map((key) => ({
      personality: key,
      percent: Math.round((counts[key] / total) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  function handleAnswer(personality: Personality) {
    const newAnswers = { ...answers, [currentQuestion]: personality };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleReset() {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  }

  const cardStyle: React.CSSProperties = {
    maxWidth: '560px',
    width: '100%',
    borderRadius: '30px',
    background: 'rgba(255, 255, 255, 0.75)',
    boxShadow: '0 8px 40px rgba(139, 90, 43, 0.15)',
    padding: '40px',
  };

  if (showResults) {
    const results = calculateResults(answers);
    const dominant = results[0];
    const secondary = results.slice(1);

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={cardStyle}>
          <h1
            style={{
              fontFamily: 'var(--font-lora), serif',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#3D2B1F',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            Your Coffee Personality
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-nunito), sans-serif',
              color: '#8B5A2B',
              textAlign: 'center',
              marginBottom: '32px',
              fontSize: '0.95rem',
            }}
          >
            Here&rsquo;s what your answers reveal...
          </p>

          {/* Dominant personality card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)',
              border: '2px solid #8B5A2B',
              borderRadius: '20px',
              padding: '28px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '2rem' }}>{PERSONALITIES[dominant.personality].emoji}</span>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-lora), serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#3D2B1F',
                  }}
                >
                  {PERSONALITIES[dominant.personality].name}
                </div>
                <div
                  style={{
                    background: '#8B5A2B',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '2px 10px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-nunito), sans-serif',
                    display: 'inline-block',
                    marginTop: '4px',
                  }}
                >
                  {dominant.percent}% match
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-nunito), sans-serif',
                color: '#6B4226',
                fontStyle: 'italic',
                marginBottom: '12px',
                fontSize: '0.95rem',
              }}
            >
              &ldquo;{PERSONALITIES[dominant.personality].tagline}&rdquo;
            </p>
            <div
              style={{
                background: 'rgba(139, 90, 43, 0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-nunito), sans-serif',
                  color: '#3D2B1F',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                ☕ Your coffee:{' '}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-nunito), sans-serif',
                  color: '#6B4226',
                  fontSize: '0.9rem',
                }}
              >
                {PERSONALITIES[dominant.personality].coffee}
              </span>
            </div>
          </div>

          {/* Secondary personalities */}
          {secondary.map(({ personality, percent }) => (
            <div
              key={personality}
              style={{
                border: '2px solid #E8D5BC',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{PERSONALITIES[personality].emoji}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-lora), serif',
                    fontWeight: 700,
                    color: '#3D2B1F',
                    fontSize: '1rem',
                  }}
                >
                  {PERSONALITIES[personality].name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-nunito), sans-serif',
                    color: '#8B7355',
                    fontSize: '0.85rem',
                  }}
                >
                  {PERSONALITIES[personality].coffee}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-nunito), sans-serif',
                  color: '#8B5A2B',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                {percent}%
              </div>
            </div>
          ))}

          <button
            onClick={handleReset}
            style={{
              width: '100%',
              marginTop: '16px',
              padding: '14px',
              borderRadius: '16px',
              background: '#8B5A2B',
              color: 'white',
              fontFamily: 'var(--font-nunito), sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#6B4226')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#8B5A2B')}
          >
            Take again
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={cardStyle}>
        {/* Progress dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i <= currentQuestion ? '#8B5A2B' : '#E8D5BC',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* Question counter */}
        <p
          style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            color: '#C49A6C',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </p>

        {/* Question text */}
        <h2
          style={{
            fontFamily: 'var(--font-lora), serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#3D2B1F',
            marginBottom: '28px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {question.text}
        </h2>

        {/* Answer options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option.personality)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '2px solid #E8D5BC',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s, background 0.2s',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C49A6C';
                e.currentTarget.style.background = '#FFF8F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E8D5BC';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{option.emoji}</span>
              <span
                style={{
                  fontFamily: 'var(--font-nunito), sans-serif',
                  color: '#3D2B1F',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
