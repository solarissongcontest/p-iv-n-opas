import { useEffect, useId, useRef, useState } from "react";

const ABITTI_EDITOR_VERSION = "8.13.0";
const ABITTI_EDITOR_BASE =
  "https://unpkg.com/rich-text-editor@" + ABITTI_EDITOR_VERSION + "/dist/";
const ABITTI_EDITOR_SCRIPT = ABITTI_EDITOR_BASE + "rich-text-editor-bundle.js";
const MATHQUILL_STYLESHEET =
  "https://unpkg.com/@digabi/mathquill@0.10.12/build/mathquill.css";

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
    __opkMathQuillStylePromise?: Promise<void>;
    MathJax?: MathJaxGlobal;
  }
}

const MATHJAX_SCRIPT =
  "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js";

function ensureEditorFixStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector('style[data-opk-abitti-fixes="true"]')) return;

  const style = document.createElement("style");
  style.dataset["opkAbittiFixes"] = "true";
  style.textContent = `
    .opk-abitti-editor,
    .opk-abitti-editor .opk-abitti-rich-text {
      color: var(--color-foreground) !important;
      background: var(--color-surface) !important;
      caret-color: var(--color-foreground) !important;
    }

    .opk-abitti-editor .math-editor {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.55fr) !important;
      width: 100% !important;
      margin-top: 10px !important;
      overflow: hidden !important;
      border-top: 3px solid #caedff !important;
      border-radius: 0 0 10px 10px !important;
      background: #ffffff !important;
      color: #111827 !important;
    }

    .opk-abitti-editor .math-editor-equation-field,
    .opk-abitti-editor .math-editor-latex-field {
      box-sizing: border-box !important;
      width: auto !important;
      min-width: 0 !important;
      min-height: 46px !important;
      color: #111827 !important;
      -webkit-text-fill-color: #111827 !important;
      caret-color: #111827 !important;
    }

    .opk-abitti-editor .math-editor-equation-field {
      display: flex !important;
      align-items: center !important;
      overflow-x: auto !important;
      background: #ffffff !important;
    }

    .opk-abitti-editor .math-editor-latex-field {
      background: #f8fafc !important;
      border-left: 1px solid #e5e7eb !important;
      line-height: 1.45 !important;
    }

    .opk-abitti-editor .mq-editable-field,
    .opk-abitti-editor .mq-root-block,
    .opk-abitti-editor .mq-math-mode,
    .opk-abitti-editor .mq-text-mode {
      color: #111827 !important;
      -webkit-text-fill-color: #111827 !important;
    }

    .opk-abitti-editor .mq-cursor {
      border-left-color: #111827 !important;
    }

    .opk-abitti-editor img[data-latex] {
      max-width: 100%;
      cursor: text;
      vertical-align: middle;
    }

    @media (max-width: 640px) {
      .opk-abitti-editor .math-editor {
        grid-template-columns: minmax(0, 1fr) !important;
      }

      .opk-abitti-editor .math-editor-latex-field {
        border-left: 0 !important;
        border-top: 1px solid #e5e7eb !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function loadMathQuillStylesheet() {
  if (typeof window === "undefined") return Promise.reject(new Error("browser-only"));
  ensureEditorFixStyles();
  if (window.__opkMathQuillStylePromise) return window.__opkMathQuillStylePromise;

  const existing = document.querySelector<HTMLLinkElement>(
    'link[data-opk-mathquill-style="true"]',
  );
  if (existing?.sheet) return Promise.resolve();

  window.__opkMathQuillStylePromise = new Promise<void>((resolve, reject) => {
    const link = existing ?? document.createElement("link");
    const finish = () => resolve();
    const fail = () => reject(new Error("MathQuillin tyylien lataus epäonnistui."));

    link.addEventListener("load", finish, { once: true });
    link.addEventListener("error", fail, { once: true });

    if (!existing) {
      link.rel = "stylesheet";
      link.href = MATHQUILL_STYLESHEET;
      link.dataset["opkMathquillStyle"] = "true";
      document.head.appendChild(link);
    }
  }).catch((error) => {
    delete window.__opkMathQuillStylePromise;
    throw error;
  });

  return window.__opkMathQuillStylePromise;
}

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
    '<text x="8" y="23" font-size="16" font-family="serif" fill="#111827">' +
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
  ensureEditorFixStyles();
  if (window.__opkAbittiEditorPromise) return window.__opkAbittiEditorPromise;

  window.__opkAbittiEditorPromise = loadMathQuillStylesheet()
    .then(() => {
      if (window.makeRichText) return;

      return new Promise<void>((resolve, reject) => {
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
      });
    })
    .catch((error) => {
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
    .replace(/<img\b[^>]*\bdata-latex=(["'])(.*?)\1[^>]*>/gi, (_match, _quote, latex: string) => " " + latex + " ")
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
              color: "var(--color-foreground)",
              backgroundColor: "var(--color-surface)",
              caretColor: "var(--color-foreground)",
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
    <div className={className} onKeyDown={(event) => event.stopPropagation()}>
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
            className="opk-abitti-editor overflow-visible rounded-xl border border-border bg-surface"
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
