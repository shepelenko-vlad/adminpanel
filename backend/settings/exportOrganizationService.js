const xlsx = require('xlsx');
const path = require('path');

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportOrganizationToExcel = (organizations, workSheetColumnNames, workSheetName, filePath) => {
    const data = organizations.map(organization => {
        return [organization.OrganizationName, organization.TypeName, organization.SubjectName, organization.Email];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

module.exports = exportOrganizationToExcel