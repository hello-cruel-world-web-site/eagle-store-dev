#!/bin/bash

git add .

git commit -m "$(zenity --entry --title='Texto commit' --text='Digite o texto do commit')"

git push


zenity --notification --text="Repositorio atualizado"
