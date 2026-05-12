import React from "react";

export default function AttachmentsSection({ attachments }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold">Pièces jointes</h3>
      {attachments?.length > 0 ? (
        <ul>
          {attachments.map((file, i) => (
            <li key={i} className="flex items-center">
              📎{" "}
              <a href={file.url} className="text-blue-600 ml-2">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucune pièce jointe.</p>
      )}
    </div>
  );
}
