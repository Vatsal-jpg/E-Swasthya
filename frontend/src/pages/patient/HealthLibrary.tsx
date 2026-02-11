import { useState } from 'react';
import { BookOpen, ChevronRight, X } from 'lucide-react';
import PatientLayout from '@/components/layouts/PatientLayout';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { healthArticles } from '@/data/mockData';

const HealthLibrary = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const currentArticle = healthArticles.find(a => a.id === selectedArticle);

  return (
    <PatientLayout>
      <Breadcrumbs />

      <div
        className="
          bg-primary/30
          m-4 md:m-6 lg:m-10
          p-6 md:p-8 lg:p-10
          rounded-[2.5rem]
          min-h-[calc(100%-4rem)]
        "
      >
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary">
            Health Education Library
          </h1>
          <p className="text-muted-foreground mt-2">
            Learn about common health conditions and how to manage them effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthArticles.map((article) => (
            <div
              key={article.id}
              className="bg-card rounded-xl shadow-card border p-6 hover:shadow-hover transition-all duration-200 cursor-pointer group"
            >
              {/* Emoji removed */}
              <div className="mb-4">
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-secondary mb-2 group-hover:text-secondary/80 transition-colors">
                {article.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4">
                {article.description}
              </p>

              <div
                className="flex items-center text-secondary font-medium text-sm group-hover:gap-2 transition-all"
                onClick={() => setSelectedArticle(article.id)}
              >
                Read More
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && currentArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedArticle(null)}>
          <div className="bg-card rounded-xl shadow-card border max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-card border-b p-6 flex items-start justify-between">
              <div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {currentArticle.category}
                </span>
                <h2 className="font-display text-2xl font-bold text-secondary mt-3">
                  {currentArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {currentArticle.detailedContent}
              </p>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
};

export default HealthLibrary;