"use client"
import TableFilterTabs from "@/components/shared/table/table-filter-tabs"
import TablePageHeader from "@/components/shared/table/table-page-header"
import { announcementColumns } from "@/features/reminder/components/announcment/columns"

import React, { useEffect, useState } from "react"
import { ticketColumns } from "./columns"
import { retieveTicket } from "../api/api"
import { fetchTicket } from "../action/action"

import { Ticket } from "@/features/ticket/types/types"
import TicketEditModal from "./ticket-modal"
import { DataTable } from "./data-table"

const CustomerTicketPage = () => {
  const [ticketData, setTicketData] = useState<any[]>([]) // initialize with empty array
  const [loading, setLoading] = useState(true)
  const [editTicket, setEditTicket] = useState<any | null>(null)

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTicket()
      setTicketData(data)
      setLoading(false)
    }

    getTickets()
  }, [])

  const handleModalClose = () => {
    setEditTicket(null)
  }

  if (loading) return <div>Loading tickets...</div> // optional loading UI
  return (
    <div className="flex pr-10 md:pr-0 flex-col gap-y-3 md:gap-y-6 overflow-x-auto max-w-screen">
      <TablePageHeader
        title="Customer Ticket"
        description="Manage and Customize your customer ticket"
      />

      <DataTable columns={ticketColumns(setEditTicket)} data={ticketData} />

      {editTicket && (
        <>
          <TicketEditModal ticket={editTicket} onClose={handleModalClose} />
        </>
      )}
    </div>
  )
}

export default CustomerTicketPage
