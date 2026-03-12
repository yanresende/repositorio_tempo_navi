import { useNavigate } from 'react-router-dom';
import { Search, MoreHorizontal, Send, Hand, FileText, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Triagem() {
  return (
    <div className="space-y-6">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Triagem</h1>
          <p className="text-gray-500 text-sm">
            Encaminhe os pacientes para o serviço desejado.
          </p>
        </div>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou prontuário..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <select className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-gray-600 bg-white">
          <option>Aguardando</option>
          <option>Em Atendimento</option>
          <option>Finalizado</option>
        </select>
      </div>

      {/* TABELA DE PACIENTES */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Paciente</th>
                <th className="px-6 py-4">CPF</th>
                <th className="px-6 py-4">Chegada</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Encaminhar Para</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <TriagemRow
                name="Carlos Andrade"
                email="carlos.a@email.com"
                cpf="111.222.333-44"
                chegada="10:30"
                status="Aguardando"
              />
              <TriagemRow
                name="Fernanda Lima"
                email="fernanda.l@email.com"
                cpf="555.666.777-88"
                chegada="11:15"
                status="Aguardando"
              />
              <TriagemRow
                name="Bruno Costa"
                email="bruno.c@email.com"
                cpf="999.888.777-66"
                chegada="09:45"
                status="Em Atendimento"
                atendimento="Psicologia"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TriagemRow({ name, email, cpf, chegada, status, atendimento }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickFora(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const getStatusClass = () => {
    switch (status) {
      case 'Aguardando':
        return 'bg-yellow-100 text-yellow-600';
      case 'Em Atendimento':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-700">{name}</div>
            <div className="text-xs text-gray-400">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{cpf}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{chegada}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass()}`}>
          {status} {atendimento && `(${atendimento})`}
        </span>
      </td>

      {/* BOTÃO DE AÇÃO COM MENU DROP DOWN */}
      <td className="px-6 py-4 text-center relative" ref={menuRef}>
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          disabled={status !== 'Aguardando'}
        >
          <Send size={20} />
        </button>

        {menuAberto && (
          <div className="absolute right-6 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in duration-200">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <FileText size={16} /> Anamnese
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
              <Hand size={16} /> Assistência Social
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">
              <Clock size={16} /> Psicologia
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
