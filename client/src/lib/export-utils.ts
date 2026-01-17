import { mockDashboardStats, mockValidationTests } from '@/lib/autoclave-data';

// Export data to CSV
export const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Escape commas and quotes
                const escaped = String(value).replace(/"/g, '""');
                return `"${escaped}"`;
            }).join(',')
        )
    ].join('\n');

    // Create download
    downloadFile(csvContent, filename, 'text/csv');
};

// Export data to JSON
export const exportToJSON = (data: any, filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
};

// Export report as text
export const exportReportAsText = (test: any) => {
    const content = `
RAPPORT DE VALIDATION MÉTROLOGIQUE
====================================

Test ID: ${test.id}
Date: ${new Date(test.testDate).toLocaleDateString('fr-FR')}
Type: ${test.testType}

OPÉRATEUR
---------
Nom: ${test.operatorName}

ÉQUIPEMENT
----------
Autoclave: ${test.autoclaveName}
Modèle: ${test.autoclaveModel}
Numéro de série: ${test.serialNumber}

STATUT
------
Résultat: ${test.status === 'passed' ? 'RÉUSSI ✓' : 'ÉCHOUÉ ✗'}

CONCLUSIONS
-----------
${test.conclusions}

PROCHAIN TEST
-------------
Date prévue: ${new Date(test.nextTestDate).toLocaleDateString('fr-FR')}

====================================
Généré le ${new Date().toLocaleString('fr-FR')}
`;

    downloadFile(content, `rapport_${test.id}.txt`, 'text/plain');
};

// Export dashboard stats
export const exportDashboardStats = () => {
    const stats = {
        date_export: new Date().toISOString(),
        statistiques: mockDashboardStats,
        tests: mockValidationTests
    };

    exportToJSON(stats, `dashboard_stats_${new Date().toISOString().split('T')[0]}.json`);
};

// Helper function to trigger download
const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
