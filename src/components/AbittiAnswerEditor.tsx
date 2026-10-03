import { useEffect, useId, useRef, useState } from "react";

const ABITTI_EDITOR_VERSION = "8.13.0";
const ABITTI_EDITOR_BASE =
  "https://unpkg.com/rich-text-editor@" + ABITTI_EDITOR_VERSION + "/dist/";
const ABITTI_EDITOR_SCRIPT = ABITTI_EDITOR_BASE + "rich-text-editor-bundle.js";

type AbittiAnswer = {
  answerHtml: string;
  answerText: string;
  imageCount: number;
};

type MathJaxGlobal = {
  startup?: { promise?: Promise<void> };
  tex2svgPromise?: (latex: string, options?: { display?: boolean }) => Promise<HTMLElement>;
  loader?: Record<string, unknown>;
  tex?: Record<string, unknown>;
  svg?: Record<string, unknown>;
};

type MakeRichText = (input: {
  container: HTMLElement;
  language: "FI";
  baseUrl: string;
  initialValue?: string;
  allowedFileTypes: string[];
  onValueChange: (value: AbittiAnswer | string) => void;
  onLatexUpdate?: (img: HTMLImageElement, latex: string) => void;
  textAreaProps?: {
    ariaLabelledBy?: string;
    editorStyle?: Record<string, string | number>;
    className?: string;
    id?: string;
    lang?: string;
  };
}) => unknown;

declare global {
  interface Window {
    makeRichText?: MakeRichText;
    __opkAbittiEditorPromise?: Promise<void>;
    __opkMathJaxPromise?: Promise<void>;
    MathJax?: MathJaxGlobal;
  }
}

const MATHJAX_SCRIPT =
  "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js";

function loadMathJax() {
  if (typeof window === "undefined") return Promise.reject(new Error("browser-only"));
  if (window.MathJax?.tex2svgPromise) return Promise.resolve();
  if (window.__opkMathJaxPromise) return window.__opkMathJaxPromise;

  window.MathJax = {
    loader: { load: ["[tex]/mhchem"] },
    tex: { packages: { "[+]": ["mhchem"] } },
    svg: { fontCache: "none" },
  };

  window.__opkMathJaxPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-opk-mathjax="true"]',
    );
    const finish = async () => {
      try {
        await window.MathJax?.startup?.promise;
        if (window.MathJax?.tex2svgPromise) resolve();
        else reject(new Error("MathJax ei rekisteröitynyt."));
      } catch (error) {
        reject(error);
      }
    };

    if (existing) {
      existing.addEventListener("load", () => void finish(), { once: true });
      existing.addEventListener("error", () => reject(new Error("MathJaxin lataus epäonnistui.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = MATHJAX_SCRIPT;
    script.async = true;
    script.dataset["opkMathjax"] = "true";
    script.addEventListener("load", () => void finish(), { once: true });
    script.addEventListener("error", () => reject(new Error("MathJaxin lataus epäonnistui.")), { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    delete window.__opkMathJaxPromise;
    throw error;
  });

  return window.__opkMathJaxPromise;
}

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function latexFallbackDataUrl(latex: string) {
  const width = Math.max(80, Math.min(1200, latex.length * 9 + 20));
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + width +
    '" height="34" viewBox="0 0 ' + width + ' 34">' +
    '<rect width="100%" height="100%" fill="white"/>' +
    '<text x="8" y="23" font-size="16" font-family="serif" fill="currentColor">' +
    xmlEscape(latex) + "</text></svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

async function renderLatexImage(img: HTMLImageElement, latex: string) {
  img.setAttribute("alt", latex);
  img.setAttribute("data-latex", latex);
  const expectedLatex = latex;

  try {
    await loadMathJax();
    if (!window.MathJax?.tex2svgPromise) throw new Error("MathJax puuttuu.");
    const wrapper = await window.MathJax.tex2svgPromise(latex, { display: false });
    const svg = wrapper.querySelector("svg");
    if (!svg) throw new Error("SVG-renderöinti epäonnistui.");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const serialized = new XMLSerializer().serializeToString(svg);
    if (img.getAttribute("data-latex") !== expectedLatex) return;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(serialized);
  } catch {
    if (img.getAttribute("data-latex") !== expectedLatex) return;
    img.src = latexFallbackDataUrl(latex);
  }
}

function loadAbittiEditor() {
  if (typeof window === "undefined") return Promise.reject(new Error("browser-only"));
  if (window.makeRichText) return Promise.resolve();
  if (window.__opkAbittiEditorPromise) return window.__opkAbittiEditorPromise;

  window.__opkAbittiEditorPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-opk-abitti-editor="true"]',
    );
    const finish = () => {
      if (window.makeRichText) resolve();
      else reject(new Error("Abitti-editori ei rekisteröitynyt."));
    };
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () => reject(new Error("Abitti-editorin lataus epäonnistui.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = ABITTI_EDITOR_SCRIPT;
    script.dataset["opkAbittiEditor"] = "true";
    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", () => reject(new Error("Abitti-editorin lataus epäonnistui.")), { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    delete window.__opkAbittiEditorPromise;
    throw error;
  });

  return window.__opkAbittiEditorPromise;
}

export function answerHasContent(value: string) {
  const withoutMarkup = value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return withoutMarkup.length >= 1 || /math|formula|latex|mathquill|mq-/i.test(value);
}

export function answerPlainText(value: string) {
  return value
    .replace(/<img\b[^>]*\balt=(["'])(.*?)\1[^>]*>/gi, (_match, _quote, alt: string) => " " + alt + " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>|<\/div>|<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function AbittiAnswerEditor({
  value,
  onChange,
  label = "Vastaus",
  placeholder = "Kirjoita vastauksesi…",
  disabled = false,
  minHeight = 150,
  autoFocus = false,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  autoFocus?: boolean;
  className?: string;
}) {
  const generatedId = useId();
  const labelId = generatedId + "-label";
  const hostRef = useRef<HTMLDivElement>(null);
  const emittedValueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const [fallback, setFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(0);

  onChangeRef.current = onChange;

  useEffect(() => {
    if (value === "" && emittedValueRef.current !== "") {
      emittedValueRef.current = "";
      setGeneration((current) => current + 1);
    }
  }, [value]);

  useEffect(() => {
    let active = true;
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();
    setLoading(true);
    setFallback(false);

    void loadAbittiEditor()
      .then(() => {
        if (!active || !hostRef.current || !window.makeRichText) return;
        window.makeRichText({
          container: hostRef.current,
          language: "FI",
          baseUrl: "",
          initialValue: value,
          allowedFileTypes: ["image/png", "image/jpeg"],
          onLatexUpdate: (img, latex) => {
            void renderLatexImage(img, latex);
          },
          onValueChange: (next) => {
            const normalized =
              typeof next === "string"
                ? next
                : typeof next?.answerHtml === "string"
                  ? next.answerHtml
                  : "";
            emittedValueRef.current = normalized;
            onChangeRef.current(normalized);
          },
          textAreaProps: {
            ariaLabelledBy: labelId,
            id: generatedId + "-editor",
            lang: "fi",
            className: "opk-abitti-rich-text",
            editorStyle: {
              minHeight: minHeight + "px",
              fontSize: "16px",
              lineHeight: "1.55",
            },
          },
        });
        setLoading(false);

        if (autoFocus) {
          window.setTimeout(() => {
            hostRef.current
              ?.querySelector<HTMLElement>('[contenteditable="true"], textarea')
              ?.focus();
          }, 0);
        }
      })
      .catch(() => {
        if (!active) return;
        setFallback(true);
        setLoading(false);
      });

    return () => {
      active = false;
      host.replaceChildren();
    };
  }, [autoFocus, generatedId, generation, labelId, minHeight]);

  useEffect(() => {
    const editable = hostRef.current?.querySelector<HTMLElement>('[contenteditable="true"], [contenteditable="false"]');
    if (!editable) return;
    editable.setAttribute("contenteditable", disabled ? "false" : "true");
    editable.setAttribute("aria-disabled", disabled ? "true" : "false");
  }, [disabled, loading]);

  function beginFormula() {
    const target =
      hostRef.current?.querySelector<HTMLElement>('[contenteditable="true"]') ??
      hostRef.current?.querySelector<HTMLElement>("textarea") ??
      hostRef.current;
    target?.focus();
    target?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "e",
        code: "KeyE",
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  return (
    <div className={className}>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <span id={labelId} className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={beginFormula}
            disabled={disabled || fallback || loading}
            className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-border bg-surface px-3 font-medium text-foreground disabled:opacity-50"
            aria-label="Aloita kaava"
            title="Sama toiminto kuin Abitin Ctrl+E"
          >
            <span aria-hidden="true">ƒx</span>
            <span>Kaava</span>
          </button>
          <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 sm:inline">Ctrl E</kbd>
        </div>
      </div>

      {fallback ? (
        <textarea
          rows={Math.max(4, Math.ceil(minHeight / 28))}
          className="w-full resize-y rounded-xl border bg-surface p-3"
          style={{ minHeight }}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-labelledby={labelId}
        />
      ) : (
        <div className="relative">
          <div
            ref={hostRef}
            className="opk-abitti-editor overflow-hidden rounded-xl border border-border bg-surface"
            aria-busy={loading}
          />
          {loading && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-surface/85 text-sm text-muted-foreground">
              Avataan Abitin kaavaeditoria…
            </div>
          )}
        </div>
      )}

      <p className="mt-1.5 text-xs text-muted-foreground">
        {fallback
          ? "Abitti-editoria ei saatu ladattua, joten käytössä on tavallinen tekstikenttä."
          : "Ctrl+E aloittaa kaavan kuten Abitissa. Puhelimella käytä Kaava-painiketta."}
      </p>
    </div>
  );
}
