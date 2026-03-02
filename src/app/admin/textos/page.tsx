"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Check } from "lucide-react";

interface ContentItem {
  id: string;
  key: string;
  value: string;
}

const SECTIONS: Record<string, { label: string; keys: string[] }> = {
  hero: {
    label: "Hero (Topo)",
    keys: [
      "hero_title_line1",
      "hero_title_line2",
      "hero_title_line3",
      "hero_subtitle",
      "hero_btn_primary",
      "hero_btn_secondary",
    ],
  },
  about: {
    label: "Sobre Nós",
    keys: [
      "about_section_title",
      "about_home_title",
      "about_home_text",
      "about_history_title",
      "about_history_text",
      "about_quote",
    ],
  },
  impact: {
    label: "Impacto",
    keys: [
      "impact_title",
      "impact_subtitle",
      "impact_cta_title",
      "impact_cta_text",
    ],
  },
  donation: {
    label: "Doação",
    keys: ["donation_title", "donation_subtitle", "pix_key"],
  },
  footer: {
    label: "Rodapé / Contato",
    keys: [
      "footer_description",
      "footer_address",
      "footer_phone",
      "footer_email",
      "whatsapp_number",
    ],
  },
};

const KEY_LABELS: Record<string, string> = {
  hero_title_line1: "Título linha 1",
  hero_title_line2: "Título linha 2",
  hero_title_line3: "Título linha 3",
  hero_subtitle: "Subtítulo",
  hero_btn_primary: "Botão principal",
  hero_btn_secondary: "Botão secundário",
  about_section_title: "Título da seção",
  about_home_title: "Título - Nosso lar",
  about_home_text: "Texto - Nosso lar",
  about_history_title: "Título - Trajetória",
  about_history_text: "Texto - Trajetória",
  about_quote: "Citação",
  impact_title: "Título",
  impact_subtitle: "Subtítulo",
  impact_cta_title: "CTA título",
  impact_cta_text: "CTA texto",
  donation_title: "Título",
  donation_subtitle: "Subtítulo",
  pix_key: "Chave PIX",
  footer_description: "Descrição",
  footer_address: "Endereço",
  footer_phone: "Telefone",
  footer_email: "E-mail",
  whatsapp_number: "Número WhatsApp",
};

export default function AdminTextos() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setContents(data);
        const map: Record<string, string> = {};
        data.forEach((c: ContentItem) => {
          map[c.key] = c.value;
        });
        setEdited(map);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updates = Object.entries(edited).map(([key, value]) => ({
        key,
        value,
      }));
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Textos do Site</h1>
          <p className="text-gray-500 text-sm mt-1">
            Edite os textos que aparecem no site público
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar Tudo"}
        </button>
      </div>

      {Object.entries(SECTIONS).map(([sectionKey, section]) => (
        <div
          key={sectionKey}
          className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6"
        >
          <h2 className="font-semibold text-gray-900 text-lg mb-4">
            {section.label}
          </h2>
          <div className="space-y-4">
            {section.keys.map((key) => {
              const isLong =
                key.includes("text") ||
                key.includes("subtitle") ||
                key.includes("description") ||
                key.includes("address");
              return (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                    {KEY_LABELS[key] || key}
                  </label>
                  {isLong ? (
                    <textarea
                      value={edited[key] || ""}
                      onChange={(e) =>
                        setEdited({ ...edited, [key]: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-gray-900 text-sm resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={edited[key] || ""}
                      onChange={(e) =>
                        setEdited({ ...edited, [key]: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-gray-900 text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
