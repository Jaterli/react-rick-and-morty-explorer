#!/bin/bash

# Archivo de salida
OUTPUT_FILE="contenido_completo.txt"

# Limpiar archivo anterior si existe
> "$OUTPUT_FILE"

echo "============================================================" >> "$OUTPUT_FILE"
echo "LISTADO COMPLETO DE ARCHIVOS Y SU CONTENIDO" >> "$OUTPUT_FILE"
echo "Generado el: $(date)" >> "$OUTPUT_FILE"
echo "Directorio base: $(pwd)" >> "$OUTPUT_FILE"
echo "============================================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Función para procesar archivos
process_file() {
    local file_path="$1"
    
    # Excluir el propio archivo de salida
    if [[ "$file_path" == "./$OUTPUT_FILE" ]]; then
        return
    fi
    
    echo "------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "ARCHIVO: $file_path" >> "$OUTPUT_FILE"
    echo "------------------------------------------------------------" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Intentar leer el contenido (manejar archivos binarios)
    if file "$file_path" | grep -q text; then
        cat "$file_path" >> "$OUTPUT_FILE" 2>/dev/null
    else
        echo "[CONTENIDO BINARIO - No se muestra]" >> "$OUTPUT_FILE"
    fi
    
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Función para recorrer directorios recursivamente
traverse_directory() {
    local dir="$1"
    
    # Recorrer archivos en el directorio actual
    for item in "$dir"/*; do
        if [ -f "$item" ]; then
            process_file "$item"
        elif [ -d "$item" ]; then
            traverse_directory "$item"
        fi
    done
}

echo "Iniciando procesamiento..."
traverse_directory "."

echo "archivo" 
echo "Procesamiento completado. Resultados guardados en: $OUTPUT_FILE"
echo "Total de archivos procesados: $(grep -c "^ARCHIVO:" "$OUTPUT_FILE")"
