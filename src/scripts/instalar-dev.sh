#!/bin/bash

zenity --info 	\
	--title="Iniciando" \
	--text="Olá, iniciando o instalador!" \
	--width=250 \
	--height=30

lista=$(zenity --list \
	--title="Programas" \
	--text="Selecione os programas:" \
	--column="Selecione" --column="Programa" \
	false "PyCharm Community" \
	false "Atom" \
	false "Notepad++" \
	false "Android Studio" \
	false "Php Storm" \
	false "Eclipse" \
	false "PyCharm Pro" \
	false "IDEA Community" \
	false "Notpadqq" \
	false "Brackets" \
	false "IDEA Community" \
	false "Webstorm" \
	--checklist)

if [ -z "$lista" ]; then
	zenity 	--error \
		--title="Alerta!" \
		--text="Nenhum item selecionado!" \
		--width=250 \
	        --height=30
	exit 1
fi

comando=""
IFS="|"; for programa in lista ; do
	case $programa in
		"PyCharm Community") comando="\n sudo snap install pycharm-community"  ;;
		"Atom") comando="\n sudo snap install atom" ;;
		"Notepad++") comando="\n sudo snap install notepad-plus-plus" ;;
		"Android Studio") comando="\n sudo snap install android-studio" ;;
		"Php Storm") comando="\n sudo snap install phpstorm" ;;
		"Eclipse") comando="\n sudo snap install eclipse" ;;
		"PyCharm Pro") comando="\n sudo snap install pycharm-professional" ;;
		"IDEA Community") comando="\n sudo snap install intellij-idea-community" ;;
		"Notpadqq") comando="\n sudo snap install notepadqq" ;;
		"Brackets") comando="\n sudo snap install brackets" ;;
		"IDEA Community") comando="\n sudo snap install intellij-idea-ultimate" ;;
		"Webstorm") comando="\n sudo snap install webstorm" ;;
	esac
done

zenity --info 	\
	--title="Comando" \
	--text="$comando" \
	--width=250 \
	--height=30
